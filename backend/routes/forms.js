const express = require('express');
const parseXml = require('../utils/parser');

const router = express.Router();

/* GET forms. */
router.get('/', (req, res) => {
  res.contentType('application/json').send('forms');
});

/* GET and POST specific form. */
router
  .route('/:formType')
  .get((req, res) => {
    parseXml(`./utils/${req.params.formType}.xml`)
      .then((json) => {
        const schema = json;
        schema.title = req.params.formType;
        schema.type = 'object';
        res.contentType('application/json').send(schema);
      })
      .catch((err) => {
        console.log(err);
        res.status(401).send(err.message);
      });
  });

module.exports = router;
