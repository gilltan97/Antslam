const mongoose = require('mongoose');

const { Schema } = mongoose;

const clinicianSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
});

const Clinicians = mongoose.model('Clinician', clinicianSchema);

module.exports = Clinicians;
