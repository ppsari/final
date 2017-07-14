const mongoose = require('mongoose');
let Trans = require('../models/transaction');
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
const getTranssByBuyer = (req,res) => {
  let decoded = login.getUserDetail(req.headers.token);

  Trans.find({_userId: decoded._id})
  .populate('_userId _sellerId _categoryId')
  .populate({
    path: 'connections._propertyId',
    populate: {path: '_accessId'}
  })
  .exec( (err,transs) => {
    res.send(err? {err:err} : transs );
  })

}
const getTranssBySeller = (req,res) => {
  let decoded = login.getUserDetail(req.headers.token);

  Trans.find({_sellerId: decoded._id})
  .populate('_userId _sellerId _categoryId')
  .populate({
    path: 'connections._propertyId',
    populate: {path: '_accessId'}
  })
  .exec( (err,transs) => {
    res.send(err? {err:err} : transs );
  })
}

const getTranss = (req,res) => {
  let decoded = login.getUserDetail(req.headers.token);
  if(req.params.id==='admin')
    Trans.find({}, (err,transs) => {
      res.send(err ? err : transs);
    })
  else res.send({err:'You must login'})
}
const getTrans = (req,res) => {
  let decoded = login.getUserDetail(req.headers.token);
  let id = req.params.id;
  Trans.findById(id)
  .populate('_userId _categoryId')
  .populate('_sellerId')
  .populate({
    path: 'connections._propertyId',
    populate: {path: '_accessId'}
  })
  .exec( (err,trans) => {
    console.log(trans)
    if (err) res.send({err:err});
    else if (trans._userId._id == decoded._id || trans._sellerId._id == decoded._id || decoded.role === 'admin') res.send(trans);
    else res.send({err:'Invalid Access'});
  })
}

const addTrans = (req,res) => {
  let transDt = req.body;
  let decoded = login.getUserDetail(req.headers.token);
  transDt._sellerId = decoded._id;

  if (transDt._userId == decoded._id) res.send({err:'You cant rent/sell your own product'})
  else {
    let trans = new Trans(transDt);
    trans.save((err,newtrans) => {
      if (err) {
        let err_msg = [];
        for (let error in err.errors) err_msg.push(err.errors[error].message);
        res.send({err : err_msg.join(',')});
      } else res.send(newtrans)
    })
  }
}

module.exports = {
  getTranss,
  getTrans,
  getTranssByBuyer,
  getTranssBySeller,
  addTrans,
  checkAuth
}