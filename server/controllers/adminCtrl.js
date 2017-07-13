const mongoose = require('mongoose');
let Admin = require('../models/admin');

const getAdmins = (req,res) => {
  Admin.find({}, (err,admins) => {
    res.send(err ? err : admins);
  })
}
const getAdmin = (req,res) => {
  let id = req.params.id;
  Admin.findById(id, (err,admin) => {
    res.send(err ? err : admin);
  })
}
const addAdmin = (req,res) => {
  let newadmin = new Admin(req.body);
  newadmin.save((err,admin) => {
    if (err) {
      let err_msg = [];
      for (let error in err.errors) err_msg.push(err.errors[error].message);
      if (err.code == 11000) err_msg.push(`Username already exist`);
      res.send({err : err_msg.join(',')});
    }
    else res.send(admin)
  })
}
const editAdmin = (req,res) => {
  let id = req.params.id;
  Admin.findById(id, (err,admin) => {
    if (err) res.send({err: 'Invalid Admin'})
    else {
      if (typeof req.body.password !== 'undefined') admin.password = req.body.password;
      admin.save((err,edadmin)=> {res.send(err ? {err: err} : edadmin)} );
    }
  })
}
const deleteAdmin = (req,res) => {
  let id = req.params.id;
  Admin.findById(id, (err,admin) => {
    if (err) res.send({err: 'Invalid Admin'})
    else admin.remove((err,deleted) => {res.send(err? err : deleted)})
  })
}

module.exports = {
  getAdmins,
  getAdmin,
  addAdmin,
  editAdmin,
  deleteAdmin
}