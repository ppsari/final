const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let roomSchema = new Schema({
  name: {type: String, required: [true, `{PATH} must be filled`]},
  image: {type: String, required: [true, `{PATH} must be filled`]},
  descr: {type: String, required: [true, `{PATH} must be filled`]},
  _propertyId: {type:Schema.Types.ObjectId, ref: 'PropertyRent'},
  _userId: {type:Schema.Types.ObjectId, ref: 'User'},
})

let RoomRent =  mongoose.model('RoomRent',roomSchema)

module.exports = RoomRent;
