const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let accessSchema = new Schema({
  icon: {
    type: String,
    required : [true,'{PATH} must be filled'],
  },
  name: {
    type: String,
    required: [true, '{PATH} must be filled'],
    validate: {
      validator: function(val){ return /.{3,30}/.test(val)},
      message: `{PATH}'s length must be between 3 and 30 char`
    },
    unique: true,
  }
});

let Access = mongoose.model('Access',accessSchema);

module.exports = Access