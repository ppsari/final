const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let transactionSchema = new Schema({
  _userId: {type:Schema.Types.ObjectId, ref: 'User'},
  _sellerId: {type:Schema.Types.ObjectId, ref: 'User'},
  connections: {
    kind: String,
    _propertyId: { type: Schema.Types.ObjectId, refPath: 'connections.kind' },
    detail: {start : Date, end: Date}
  }
})

let Transaction = mongoose.model('Transaction', transactionSchema)
module.exports = Transaction;
