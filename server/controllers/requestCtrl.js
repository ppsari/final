const mongoose = require('mongoose');

let Request = require('../models/request');
let User = require('../models/user');
let login = require('../helpers/login');
let contact = require('../helpers/contact');

const checkAuth = (req,res, next) => {
  let method = req.method;
  let hasParam = req.path !== '/';

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

  if (requestDt._sellerId === requestDt._userId) res.send({err:'You cant rent/sell your own product'})
  else {
    User.findById(requestDt._sellerId, (err,seller)=> {
      if (err) res.send({err: 'invalid seller'})
      else {
        let newrequest = new Request(requestDt);
        newrequest.save((err,request) => {
          if (err) res.send({err:err})
          else {
            let msg = {
              subject: 'There is a request for you',
              body: 'Please check your request page to approve/reject'
            }
            contact.contact(seller,msg);
            res.send(request);
          }
          // res.send(err? {err:err} : request );
        })

      }
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

