const mongoose = require('mongoose');

const { Schema } = mongoose;

const procedureSchema = new Schema({
  type: {
    type: String,
    required: true,
  },
  'xml-form': {
    type: String,
    required: true,
  },
});

const Procedures = mongoose.model('Procedure', procedureSchema);

module.exports = Procedures;
