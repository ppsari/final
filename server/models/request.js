const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let requestSchema = new Schema({
  note: String,
  connections: {
    kind: String,
    _propertyId: { type: Schema.Types.ObjectId, refPath: 'connections.kind' },
    detail: {start: Date, end: Date}
  },
  _sellerId: {type:Schema.Types.ObjectId, ref: 'User'},
  _userId: {type:Schema.Types.ObjectId, ref: 'User'},
})

let Request = mongoose.model('Request', requestSchema)
module.exports = Request