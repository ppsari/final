const mongoose = require('mongoose');
let Room = require('../models/roomSell');
let PropertySell = require('../models/propertySell');
let login = require('../helpers/login');

const checkAuth = (req,res, next) => {
  let method = req.method;
  let hasParam = req.path !== '/';

  if (req.headers.hasOwnProperty('token')){
    let decoded = login.getUserDetail(req.headers.token);
    if (decoded) next();
    else res.send({err:'You must login'})
  } else res.send({err:'You must login'})
}
const getRooms = (req,res) => {
  Room.find({_propertyId : req.params._propertyId}, (err,rooms) => {
    res.send(err ? err : rooms);
  })
}
const getRoom = (req,res) => {
  Room.findById( req.params._roomId , (err, record)=>{
    err ? res.json({ err }) : res.json(record)
  })
}
const addRoom = (req,res) => {
  let decoded = login.getUserDetail(req.headers.token);
  let room = new Room({
    name: req.body.name,
    image: req.body.image,
    descr: req.body.descr,
    _propertyId: req.params._propertyId,
    _userId: decoded._id
  });
  room.save((err,newroom) => {
    if (err) {
      let err_msg = [];
      for (let error in err.errors) err_msg.push(err.errors[error].message);
      res.send({err : err_msg.join(',')});
    } else {
      PropertySell.update({_id: newroom._propertyId},{$push: {_roomId: newroom._id}}, {new: true, safe: true, upsert: true}).exec((error, result)=> {
        if(error) res.send(error)
        else {
          res.send(newroom)
        }
      })
    }
  })
}
const editRoom = (req,res) => {
  let decoded = login.getUserDetail(req.headers.token);
  Room.findById(req.params._roomId, (err,room) => {
    if (err) res.send({err: 'Invalid Property'})
    else if (room._userId != decoded._id || decoded.role !== 'admin') res.send({err:'Invalid access'});
    else {
      if (typeof req.body.name != 'undefined') room.name = req.body.name;
      if (typeof req.body.image != 'undefined') room.image = req.body.image;
      if (typeof req.body.descr != 'undefined') room.descr = req.body.descr;
      room.save((err,edroom)=> {
        if (err) res.send({ err: err })
        else {
          res.send(edroom)
        }
      } );
    }
  })
}
const deleteRoom = (req,res) => {
  let decoded = login.getUserDetail(req.headers.token);
  Room.findById(req.params._roomId, (err,room) => {
    if (err) res.send({err: 'Invalid Request'})
    else if (room._userId != decoded._id && decoded.role !== 'admin') res.send({err:'Invalid access'});
    else {
      // PropertySell.update({_id: room._propertyId}, { $pullAll : [{_roomId: room._id}] }).exec((error, result)=> {
      //   if(error) {
      //     res.send(error)
      //   } else {
      //     res.send({msg: "deleted"})
      //   }
      // })
      room.remove((err,deleted) => {res.send(err? err : deleted)})
    }
  })
}

module.exports = {
  getRooms,
  getRoom,
  addRoom,
  editRoom,
  deleteRoom,
  checkAuth
}
