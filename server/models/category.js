const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let categorySchema = new Schema({
  icon: {
    type: String,
    required : [true,'{PATH} must be filled'],
    // validate: {
    //   validator: function(val){ return /[a-z]{3,20}/gi.test(val) },
    //   message: `{PATH}'s length must be between 3 and 20 char`
    // },
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

let Category = mongoose.model('Category',categorySchema);

module.exports = Category