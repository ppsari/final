const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let roomSchema = new Schema({
  name: {type: String, required: [true, `{PATH} must be filled`]},
  image: {type: String, required: [true, `{PATH} must be filled`]},
  descr: {type: String, required: [true, `{PATH} must be filled`]},
  _userId: {type:Schema.Types.ObjectId, ref: 'User'},
  connections: {
    kind: String,
    _propertyId: { type: Schema.Types.ObjectId, refPath: 'connections.kind' }
  }
})

let Room =  mongoose.model('Room',roomSchema)

module.exports = Room;
