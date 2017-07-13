// name: {type: String, required: [true, `{PATH} must be filled`]},
// image: {type: String, required: [true, `{PATH} must be filled`]},
// descr: {type: String, required: [true, `{PATH} must be filled`]},
// _userId: {type:Schema.Types.ObjectId, ref: 'User'},
// connections: {
//   kind: String,
//   _propertyId: { type: Schema.Types.ObjectId, refPath: 'connections.kind' }
// }
const mongoose = require('mongoose');
let Room = require('../models/room');


const getRooms = (req,res) => {
  Room.find({}, (err,rooms) => {
    res.send(err ? err : rooms);
  })
}
const getRoom = (req,res) => {
  let id = req.params.id;
  Room.findById(id)
  .populate('_userId connections._propertyId')
  .exec( (err,room) => {
    res.send(err? {err:err.message} : room );
  })
}
const addRoom = (req,res) => {
  let room = new Room(req.body);
  room.save((err,newroom) => {
    if (err) {
      let err_msg = [];
      for (let error in err.errors) err_msg.push(err.errors[error].message);
      res.send({err : err_msg.join(',')});
    } else res.send(newroom)
  })
}
const editRoom = (req,res) => {
  let id = req.params.id;
  Room.findById(id, (err,room) => {
    if (err) res.send({err: 'Invalid Property'})
    else {
      if (typeof req.body.name != 'undefined') room.name = req.body.name;
      if (typeof req.body.image != 'undefined') room.image = req.body.image;
      if (typeof req.body.descr != 'undefined') room.descr = req.body.descr;
      if (typeof req.body._userId != 'undefined') room._userId = req.body._userId;
      if (typeof req.body._propertyId != 'undefined') room._propertyId = req.body._propertyId;
      room.save((err,edroom)=> {res.send(err ? {err: err} : edroom)} );
    }
  })
}
const deleteRoom = (req,res) => {
  let id = req.params.id;
  Room.findById(id, (err,room) => {
    if (err) res.send({err: 'Invalid Property'})
    else room.remove((err,deleted) => {res.send(err? err : deleted)})
  })
}

module.exports = {
  getRooms,
  getRoom,
  addRoom,
  editRoom,
  deleteRoom
}
