const mongoose = require('mongoose');
let Props = require('../models/propertySell');


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
const addProp = (req,res) => {
  let property = new Props(req.body);
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
  Props.findById(id, (err,property) => {
    if (err) res.send({err: 'Invalid Property'})
    else {
      if (typeof req.body.name != 'undefined') property.name = req.body.name;
      if (typeof req.body.image != 'undefined') property.image = req.body.image;
      if (typeof req.body.city != 'undefined') property.city = req.body.city;
      if (typeof req.body.descr != 'undefined') property.descr = req.body.descr;
      if (typeof req.body.price != 'undefined') property.price = req.body.price;
      if (typeof req.body.isActive != 'undefined') property.isActive = req.body.isActive;
      if (typeof req.body._ownerId != 'undefined') property._ownerId = req.body._ownerId;
      if (typeof req.body._categoryId != 'undefined') property._categoryId = req.body._categoryId;
      if (typeof req.body._accessId != 'undefined')property._accessId = req.body._accessId
      else property._accessId = [];
      property.save((err,edproperty)=> {res.send(err ? {err: err} : edproperty)} );
    }
  })
}
const deleteProp = (req,res) => {
  let id = req.params.id;
  Props.findById(id, (err,property) => {
    if (err) res.send({err: 'Invalid Property'})
    else property.remove((err,deleted) => {res.send(err? err : deleted)})
  })
}

module.exports = {
  getProps,
  getProp,
  addProp,
  editProp,
  deleteProp
}