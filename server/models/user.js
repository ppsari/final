const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const helper = require('../helpers/login')
let userSchema = new Schema({
  username: {
    type: String,
    required : [true,'{PATH} must be filled'],
    validate: {
      validator: function(val){ return /[a-z]{3,20}/gi.test(val) },
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
  },
  name: {
    type: String,
    validate: {
      validator: function(val){ return /.{3,200}/.test(val)},
      message: `{PATH}'s length must be between 3 and 200 char`
    }
  },
  phone: {
    type: String,
    validate: {
      validator: function(val){ return /^\+[0-9]{10,32}/gi.test(val) },
      message: `{PATH}'s length must be between 10 and 32 char`
    }
  },
  email: {
    type: String,
    required: [true, '{PATH} must be filled'],
    validate: {
      validator: function(val){ return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(val)},
      message: `{PATH} invalid`
    }
  }
});

userSchema.pre('save', function(next) {
  if (this.isModified('password'))
    this._doc.password = helper.hashPassword(this._doc.password);
  next();
});

let User = mongoose.model('User',userSchema);

module.exports = User