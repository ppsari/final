const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let propertyRentSchema = new Schema({
  name: {type: String, required: [true, `{PATH} must be filled`]},
  image: {type: String, required: [true, `{PATH} must be filled`]},
  status: { type: String, default: 'rent'},
  city: {type: String, required : [true,'{PATH} must be filled']},
  descr: {type: String, required: [true, `{PATH} must be filled`]},
  price: {
    amount : Number,
    descr: {
      type : String,
      lowercase: true,
      enum : {
        values: ['hour','day','month','year'],
        message : `{PATH} should be [hour|day|month|year]`
      },
      required: [true, `{PATH} must be filled`]
    }
  },
  detail : {
    luasBangunan: Number,
    luasTanah: Number,
    perabotan: Boolean,
    listrik: Boolean,
    lantai: {type: Number, default:1},
    fasilitas: [String]
  },
  renter: [{
    _renterId: {type:Schema.Types.ObjectId, ref: 'User'},
    start: Date,
    end: Date
  }],
  rentercount: {type: Number, default: 0}, //for faster sorting
  _ownerId: {type:Schema.Types.ObjectId, ref: 'User'},
  _categoryId: {type:Schema.Types.ObjectId, ref: 'Category'},
  _accessId: [{type:Schema.Types.ObjectId, ref: 'Access'}],
  _roomId: [{type:Schema.Types.ObjectId, ref: 'RoomRent'}],
  _testimonyId: [{type:Schema.Types.ObjectId, ref: 'Testimony'}],
  address: {type: String, required: [true, `{PATH} must be filled`]},
  location: {
    lng: String,
    lat: String
  },
  createdDate: {type:Date, default: new Date()}
})

let PropertyRent =  mongoose.model('PropertyRent',propertyRentSchema)

module.exports = PropertyRent;
