const mongoose = require('mongoose');
let Request = require('../models/request');
let login = require('../helpers/login');

const checkAuth = (req,res, next) => {
  let method = req.method;
  let hasParam = req.path === '/';

  if (req.headers.hasOwnProperty('token')){
    let decoded = login.getUserDetail(req.headers.token);
    if (decoded) next();
    else res.send({err:'You must login'})
  } else res.send({err:'You must login'})
}

const getRequests = (req,res) => {
  Request.find({}, (err,requests) => {
    res.send(err ? err : requests);
  })
}

const getRequestsByBuyer = (req,res) => {
  let decoded = login.getUserDetail(req.headers.token);

  Request.find({_userId: decoded._id})
  .populate('_userId _sellerId')
  .exec( (err,requests) => {
    res.send(err? {err:err} : requests );
  })

}
const getRequestsBySeller = (req,res) => {
  let decoded = login.getUserDetail(req.headers.token);

  Request.find({_sellerId: decoded._id})
  .populate('_userId _sellerId')
  .exec( (err,requests) => {
    res.send(err? {err:err} : requests );
  })
}

const getRequest = (req,res) => {
  let decoded = login.getUserDetail(req.headers.token);
  let id = req.params.id;
  Request.find(id)
  .populate('_sellerId _userId')
  .populate('connections._propertyId')
  .exec( (err,request) => {
    if (err) res.send(err)
    else if (request._sellerId === decoded._id) res.send(request)
    else res.send({err:'You dont have access'})
  })
}

const addRequest = (req,res) => {
  let requestDt = req.body;
  let decoded = login.getUserDetail(req.headers.token);
  requestDt._userId = decoded._id;

  if (requestDt._userId === decoded._id) res.send({err:'You cant rent/sell your own product'})
  else {
    let newrequest = new Request(requestDt);
    //send email
    // tambahcron
    newrequest.save((err,request) => {
      res.send(err? {err:err} : request );
    })
  }

}
const deleteRequest = (req,res) => {
  let requestDt = req.body;
  let decoded = login.getUserDetail(req.headers.token);
  let id = req.params.id;

  Request.findById(id, (err,request) => {
    if (err) res.send({err: 'Invalid Request'})
    else if (request._sellerId !== decoded._id || decoded._id !== 'admin') res.send({err:'Invalid access'});
    else request.remove((err,deleted) => {res.send(err? err : deleted)})
  })

  // tambahcron

}

module.exports = {
  getRequests,
  getRequest,
  addRequest,
  deleteRequest,
  getRequestsByBuyer,
  getRequestsBySeller,
  checkAuth
}

