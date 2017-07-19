const mongoose = require('mongoose');
let Access = require('../models/access');
let login = require('../helpers/login');

const checkAuth = (req,res, next) => {
  let method = req.method;
  let hasParam = req.path === '/';

  if (method === 'GET' ) next();
  else {
    let decoded = login.getUserDetail(req.headers.token);
    if (decoded) {
      if (decoded.role === 'admin') next()
      else res.send({err: 'Invalid Access'})
    } else res.send({err: 'Invalid Access'})
  }
  // if (req.headers.hasOwnProperty('token')){

  //
  //   else res.send({err:'You must login'})
  // } else res.send({err:'You must login'})
}

const getAccesses = (req,res) => {
  Access.find({}, (err,accesses) => {
    res.send(err ? err : accesses);
  })
}
const getAccess = (req,res) => {
  let id = req.params.id;
  Access.findById(id, (err,access) => {
    res.send(err ? err : access);
  })
}
const addAccess = (req,res) => {
  let newaccess = new Access(req.body);
  newaccess.save((err,access) => {
    if (err) {
      let err_msg = [];
      for (let error in err.errors) err_msg.push(err.errors[error].message);
      if (err.code == 11000) err_msg.push(`Access name already exist`);
      res.send({err : err_msg.join(',')});
    } else res.send(access)
  })
}
const editAccess = (req,res) => {
  let id = req.params.id;
  Access.findById(id, (err,access) => {
    if (err) res.send({err: 'Invalid Access'})
    else {
      if (typeof req.body.name !== 'undefined') access.name = req.body.name;
      if (typeof req.body.icon !== 'undefined') access.icon = req.body.icon;
      access.save((err,edaccess)=> {
        if (err) {
          let err_msg = [];
          for (let error in err.errors) err_msg.push(err.errors[error].message);
          if (err.code == 11000) err_msg.push(`Access name already exist`);
          res.send({err : err_msg.join(',')});
        } else res.send(edaccess)
      } );
    }
  })
}
const deleteAccess = (req,res) => {
  let id = req.params.id;
  Access.findById(id, (err,access) => {
    if (err) res.send({err: 'Invalid Access'})
    else access.remove((err,deleted) => {res.send(err? err : deleted)})
  })
}

module.exports = {
  getAccesses,
  getAccess,
  addAccess,
  editAccess,
  deleteAccess,
  checkAuth
}