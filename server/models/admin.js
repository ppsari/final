const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const helper = require('../helpers/login')
let adminSchema = new Schema({
  username: {
    type: String,
    required : [true,'{PATH} must be filled'],
    validate: {
      validator: function(val){ return /.{3,20}/gi.test(val) },
      message: `{PATH}'s length must be between 3 and 20 char`
    },
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: [true, '{PATH} must be filled'],
    validate: {
      validator: function(val){ return /.{8,20}/.test(val)},
      message: `{PATH}'s length must be between 8 and 20 char`
    }
  }
});

adminSchema.pre('save', function(next) {
  if (this.isModified('password'))
    this._doc.password = helper.hashPassword(this._doc.password);
  next();
});

let Admin = mongoose.model('Admin',adminSchema);

module.exports = Admin