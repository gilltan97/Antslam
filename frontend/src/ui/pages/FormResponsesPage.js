import React from 'react';


import * as moment from 'moment';
import ReactJson from 'react-json-view';
import {
  Card, CardBody, CardTitle,
} from 'reactstrap';
import { getFormResponses } from '../../services/form_responses';

const style = {
  toast: {
    width: '1000px',
  },

  cardBody: {
    paddingTop: '0',
  },

  card: {
    fontSize: '.875rem',
    fontFamily: '"Avenir Next","Lucida Grande"',

    border: '0',
    overflowWrap: 'break-word',
    wordWrap: 'break-word',
    hyphens: 'auto',
  },
};

class FormResponsePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      formResponses: [],
    };
    this.setFormResponses = this.setFormResponses.bind(this);
  }

  async componentDidMount() {
    const result = await getFormResponses();
    this.setFormResponses(result);
  }

  setFormResponses(result) {
    const closed = [];
    const responses = [];
    for (let i = 0; i < result.length; i += 1) {
      // Default state for open/closed dropdown
      closed.push(false);

      // Parse form for better display
      const response = {};

      response.clinician = result[i].clinician;
      response.patient = result[i].patient;
      response.date = new Date(result[i].date).toDateString();

      const formData = [];

      if (result[i].form) {
        Object.keys(result[i].form).forEach((key) => {
          formData.push({
            key,
            val: result[i].form[key],
          });
        });

        response.formData = formData;
        responses.push(response);
      }
    }

    this.setState({
      formResponses: responses,
    });
  }
  // Used for mock during frontend dev
  // Do not remove
  // getFormResponses() {
  //   return [
  //     {
  //       _id: "1",
  //       clinician: {
  //         name: "Musa"
  //       },
  //       patient: {
  //         name: "Amr"
  //       },
  //       form: {
  //         name: "Amr",
  //         age: "18"
  //       },
  //       date: Date.now()
  //     },
  //     {
  //       _id: "2",
  //       clinician: {
  //         name: "Musa"
  //       },
  //       patient: {
  //         name: "Mike"
  //       },
  //       form: {
  //         diagnosis: "CoffeeAddiction",
  //         treatment: {
  //           "asdasd": 1,
  //           "qweqwe": 2
  //         }
  //       },
  //       date: Date.now()
  //     }
  //   ];
  // }

  render() {
    const { formResponses } = this.state;

    const responses = [];
    formResponses.map((response) => {
      const values = {};
      response.formData.map((row) => {
        values[row.key] = row.val;
        return row;
      });
      responses.push(values);
      return response;
    });

    return (
      <div className="container">
        <div className="row">
          <div className="col">
            {
                responses.map((response, index) => (

                  <Card style={style.card} key={index.toString()}>
                    <CardTitle>
                      <strong>{formResponses[index].patient.name}</strong>
                      {' '}
·
                      {' '}
                      {moment(new Date(formResponses[index].date)).format('dddd, MMMM Do, YYYY')}
                    </CardTitle>
                    <CardBody style={style.cardBody}>
                      <ReactJson
                        name={formResponses[index].patient.name}
                        enableClipboard={false}
                        src={response}
                        shouldCollapse={(query) => query.name === formResponses[index].patient.name}
                      />
                    </CardBody>
                  </Card>
                ))
              }
          </div>
        </div>
      </div>
    );
  }
}

export default FormResponsePage;
