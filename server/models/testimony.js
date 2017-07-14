const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let testimonySchema = new Schema({
  testimony: {type: String, required: [true, `{PATH} must be filled`]},
  _userId: {type:Schema.Types.ObjectId, ref: 'User'},
  _propertyId: {type:Schema.Types.ObjectId, ref: 'PropertyRent'},
})

let Testimony =  mongoose.model('Testimony',testimonySchema)

module.exports = Testimony;
