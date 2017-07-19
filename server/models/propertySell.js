const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let propertySellSchema = new Schema({
  name: {type: String, required: [true, `{PATH} must be filled`]},
  image: {type: String, required: [true, `{PATH} must be filled`]},
  status: { type: String, default: 'sell'},
  city: {type: String, required : [true,'{PATH} must be filled']},
  descr: {type: String, required: [true, `{PATH} must be filled`]},
  address: {type: String, required: [true, `{PATH} must be filled`]},
  price: {
    amount : Number,
    descr: {type: String, default:'forever'}
  },
  detail : {
    luasBangunan: Number,
    luasTanah: Number,
    perabotan: Boolean,
    listrik: Boolean,
    lantai: Number,
    fasilitas: [String]
  },
  isActive: {type: Boolean, default: true},
  _ownerId: {type:Schema.Types.ObjectId, ref: 'User'},
  _categoryId: {type:Schema.Types.ObjectId, ref: 'Category'},
  _accessId: [{type:Schema.Types.ObjectId, ref: 'Access'}],
  _roomId: [{type:Schema.Types.ObjectId, ref: 'RoomSell'}],
  location: {
    lng: String,
    lat: String
  },
  createdDate: {type:Date, default: new Date()}
})

let PropertySell =  mongoose.model('PropertySell',propertySellSchema)
module.exports = PropertySell;
