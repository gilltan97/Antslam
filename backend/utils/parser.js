const xml2js = require('xml2js');
const fs = require('fs');
const util = require('util');

function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}

// TODO handle if ListItem has a ChildItems: add it as a dependency in a second parsing
const parseListItems = (listItems) => {
  const items = Array.isArray(listItems) ? listItems : [listItems];
  return items.map((listItem) => listItem.$.title);
};

const parseListResponseItems = (listItemResponseField) => {
  const items = Array.isArray(listItemResponseField)
    ? listItemResponseField : [listItemResponseField];
  const listRespItems = {};
  items.forEach((listRespItem) => {
    const type = Object.keys(listRespItem.Response)[1];
    listRespItems[listRespItem.Response.$.name] = { type, title: 'Specify' };
  });
  return listRespItems;
};

const parseChildItems = (childItems) => {
  const properties = {};
  const dependencies = {};
  let optionProp;
  Object.keys(childItems).forEach((key) => {
    if (key === 'Question') {
      const questions = Array.isArray(childItems.Question)
        ? childItems.Question : [childItems.Question];
      questions.forEach((question) => {
        const { name } = question.$;
        if (Object.hasOwnProperty.call(question, 'ResponseField')) {
          const type = Object.keys(question.ResponseField.Response)[1];
          const { title } = question.$;
          properties[name] = {
            type,
            title,
          };
        }
        if (Object.hasOwnProperty.call(question, 'ListField')) {
          const listItems = question.ListField.List.ListItem;
          const { title } = question.$;

          const items = Array.isArray(listItems) ? listItems : [listItems];
          const pDependencies = {};
          let responseField; let responseFieldName;
          items.forEach((listItem) => {
            if (Object.hasOwnProperty.call(listItem, 'ChildItems')) {
              [responseField] = parseChildItems(listItem.ChildItems);
            } else if (Object.hasOwnProperty.call(listItem, 'ListItemResponseField')) {
              responseField = parseListResponseItems(listItem.ListItemResponseField);
            } else {
              return;
            }
            const resp = { answerOption: listItem.$.title }; // the dep trigger
            [responseFieldName] = Object.keys(responseField);
            resp[responseFieldName] = responseField[responseFieldName]; // a single dep
            pDependencies[responseFieldName] = resp;
          });

          const depQuestion = pDependencies;
          const parsedListItems = parseListItems(listItems);
          if (isEmpty(depQuestion)) {
            properties[name] = {
              type: 'array',
              title,
              uniqueItems: true,
              items: {
                type: 'string',
                enum: parsedListItems,
              },
            };
          } else {
            properties[name] = {
              type: 'string', // only format supported by dependencies
              title,
              enum: parsedListItems,
            };
            dependencies[name] = {
              oneOf: [],
            };
            Object.keys(depQuestion).forEach((qID) => {
              optionProp = { properties: {} };
              optionProp.properties[name] = {
                enum: [
                  depQuestion[qID].answerOption,
                ],
              };
              optionProp.properties[qID] = depQuestion[qID][qID];
              dependencies[name].oneOf.push(optionProp);
            });
          }
        }
      });
    } else if (key === 'Section') {
      const sections = Array.isArray(childItems.Section)
        ? childItems.Section : [childItems.Section];
      sections.forEach((section) => {
        const [prop, dep] = parseChildItems(section.ChildItems);
        properties[section.$.name] = {
          type: 'object',
          title: section.$.title,
          properties: prop,
        };
        if (!isEmpty(dep)) {
          properties[section.$.name].dependencies = dep;
        }
      });
    } else {
      console.log('Key is neither Section nor Question: ', key);
    }
  });
  return [properties, dependencies];
};

/**
function parseXml returns a promise with result
example call:
const parseXml = require('./utils/parser');
parseXml("./utils/sample-xml-data.xml")
  .then(json => {
    console.log(json);
  })
  .catch(err => console.log(err));
*/
const parseXml = (xml) => {
  const parser = new xml2js.Parser({ explicitArray: false });
  return new Promise((resolve, reject) => {
    try {
      const content = fs.readFileSync(xml, 'utf8');
      parser.parseStringPromise(content)
        .then((result) => {
          // Return a schema according to react-jsonschema-form https://react-jsonschema-form.readthedocs.io/en/latest/
          if (!Object.prototype.hasOwnProperty.call(result, 'SDCPackage')
            || !Object.prototype.hasOwnProperty.call(result.SDCPackage, 'XMLPackage')
            || !Object.prototype.hasOwnProperty.call(result.SDCPackage.XMLPackage, 'FormDesign')
            || !Object.prototype.hasOwnProperty.call(result.SDCPackage.XMLPackage.FormDesign, 'Body')) {
            reject(new Error('XML format is invalid'));
            return;
          }
          const formDesign = result.SDCPackage.XMLPackage.FormDesign;
          const schema = {
            title: formDesign.$.formTitle,
            type: 'object',
            required: [],
            properties: {
            },
          };
          console.log(util.inspect(formDesign.Body.ChildItems, { showHidden: false, depth: null }));

          // TODO handle required properties
          const [prop, dep] = parseChildItems(formDesign.Body.ChildItems);
          schema.properties = prop;
          if (!isEmpty(dep)) {
            schema.dependencies = dep;
          }
          console.log(util.inspect(schema, { showHidden: false, depth: null }));
          resolve(schema);
        })
        .catch((err) => reject(err));
    } catch (err) {
      reject(err);
    }
  });
};

module.exports = parseXml;
