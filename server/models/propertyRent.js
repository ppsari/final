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
  rentUntil: Date,
  _ownerId: {type:Schema.Types.ObjectId, ref: 'User'},
  _categoryId: {type:Schema.Types.ObjectId, ref: 'Category'},
  _accessId: [{type:Schema.Types.ObjectId, ref: 'Access'}],
  _roomId: [{type:Schema.Types.ObjectId, ref: 'RoomRent'}],
  _testimonyId: [{type:Schema.Types.ObjectId, ref: 'Testimony'}]
})

let PropertyRent =  mongoose.model('PropertyRent',propertyRentSchema)

module.exports = PropertyRent;
