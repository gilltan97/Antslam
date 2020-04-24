const mongoose = require('mongoose');

const { Schema } = mongoose;

const formResponseSchema = new Schema({
  date: {
    type: Date,
    default: Date.now(),
    required: true,
  },
  clinician: {
    type: Schema.Types.ObjectId,
    ref: 'Clinician',
    required: true,
  },
  patient: {
    type: Schema.Types.ObjectId,
    ref: 'Patient',
    required: true,
  },
  formId: {
    type: String,
    required: true,
  },
  form: {
    type: Object,
    required: true,
  },
});

const FormResponses = mongoose.model('FormResponse', formResponseSchema);

module.exports = FormResponses;
