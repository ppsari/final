const mongoose = require('mongoose');
let Props = require('../models/propertySell');
let login = require('../helpers/login');

const checkAuth = (req,res, next) => {
  let method = req.method;
  let hasParam = req.path !== '/';
  let decoded = req.headers.hasOwnProperty('token') ? login.getUserDetail(req.headers.token) : false;

  if (!hasParam) next()
  else {
    switch(method) {
      case 'GET' : next(); break;
      case 'PUT' : case 'DELETE' :
        if (decoded) next();
        else res.send({err: 'You must login'});
        break;
      default:
        res.send({err: 'You dont have access'}); break;
    }
  }
}

const getProps = (req,res) => {
  Props.find({}, (err,properties) => {
    res.send(err ? err : properties);
  })
}

const getProp = (req,res) => {
  let id = req.params.id;
  Props.findById(id)
  .populate('_price _categoryId _accessId _ownerId')
  .exec( (err,property) => {
    res.send(err? {err:err.message} : property );
  })
}

const searchProps = (req,res) => {
  //owner, location, category
  if (typeof req.params.searchKey === 'undefined') res.send({err: 'Invalid Search Keyword'})
  else if (typeof req.params.searchValue === 'undefined') res.send({err: 'Invalid Search Value'})
  else {
    let searchValue = new RegExp(req.params.searchValue, "i")
    Props.find({
      [req.params.searchKey] : searchValue
    })
    .populate('_price _categoryId _accessId _ownerId')
    .exec( (err,property) => {
      res.send(err? {err:err.message} : property );
    })
  }
}

const addProp = (req,res) => {
  let propertyDt = req.body;
  let decoded = login.getUserDetail(req.headers.token);
  propertyDt._ownerId = decoded._id;

  let property = new Props(propertyDt);

  property.save((err,newproperty) => {
    if (err) {
      let err_msg = [];
      for (let error in err.errors) err_msg.push(err.errors[error].message);
      res.send({err : err_msg.join(',')});
    } else res.send(newproperty)
  })
}
const editProp = (req,res) => {
  let id = req.params.id;
  let decoded = login.getUserDetail(req.headers.token);

  Props.findById(id, (err,property) => {
    if (err) res.send({err: 'Invalid Property'})
    else if (decoded._id !== property._ownerId) res.send({err : 'Invalid Access'})
    else {
      if (typeof req.body.name != 'undefined') property.name = req.body.name;
      if (typeof req.body.image != 'undefined') property.image = req.body.image;
      if (typeof req.body.city != 'undefined') property.city = req.body.city;
      if (typeof req.body.descr != 'undefined') property.descr = req.body.descr;
      if (typeof req.body.price != 'undefined') property.price = req.body.price;
      if (typeof req.body.isActive != 'undefined') property.isActive = req.body.isActive;
      // if (typeof req.body._ownerId != 'undefined') property._ownerId = req.body._ownerId;
      property._accessId = (typeof req.body._accessId != 'undefined') ? req.body._accessId : [];
      property._roomId = (typeof req.body._roomId != 'undefined') ? req.body._roomId : [];
      property._testimonyId = (typeof req.body._testimonyId != 'undefined') ? req.body._testimonyId : [];

      property.save((err,edproperty)=> {res.send(err ? {err: err} : edproperty)} );
    }
  })
}
const deleteProp = (req,res) => {
  let id = req.params.id;
  let decoded = login.getUserDetail(req.headers.token);

  Props.findById(id, (err,property) => {
    if (err) res.send({err: 'Invalid Property'})
    else if (decoded._id !== property._ownerId) res.send({err : 'Invalid Access'})
    else property.remove((err,deleted) => {res.send(err? err : deleted)})
  })
}

module.exports = {
  getProps,
  getProp,
  addProp,
  editProp,
  deleteProp,
  checkAuth,
  searchProps
}