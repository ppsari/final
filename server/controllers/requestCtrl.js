const mongoose = require('mongoose');
let Request = require('../models/request');
let login = require('../helpers/login');

const getRequests = (req,res) => {
  Request.find({}, (err,requests) => {
    res.send(err ? err : requests);
  })
}
const getRequest = (req,res) => {
  let id = req.params.id;
  Request.findById(id)
  .populate('_sellerId _userId')
  .populate('connections._propertyId')
  .exec( (err,request) => {
    res.send(err? {err:err} : request );
  })
}

const addRequest = (req,res) => {
  let newrequest = new Request(req.body);
  newrequest.save((err,request) => {
    res.send(err? {err:err} : request );
  })
}
const deleteRequest = (req,res) => {
  // di panggil pas reject & approve
  // cari tipe data dulu
  let id = req.params.id;
  Request.findById(id, (err,request) => {
    if (err) res.send({err: 'Invalid Request'})
    else request.remove((err,deleted) => {res.send(err? err : deleted)})
  })
}

module.exports = {
  getRequests,
  getRequest,
  addRequest,
  deleteRequest
}

