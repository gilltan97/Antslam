const mongoose = require('mongoose');

const { Schema } = mongoose;

const patientSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
});

const Patient = mongoose.model('Patient', patientSchema);

module.exports = Patient;
