const mongoose = require('mongoose');
let User = require('../models/user');

const getUsers = (req,res) => {
  User.find({}, (err,users) => {
    res.send(err ? err : users);
  })
}
const getUser = (req,res) => {
  let id = req.params.id;
  User.findById(id, (err,user) => {
    res.send(err ? err : user);
  })
}
const addUser = (req,res) => {
  let newuser = new User(req.body);
  newuser.save((err,user) => {
    if (err) {
      let err_msg = [];
      for (let error in err.errors) err_msg.push(err.errors[error].message);
      if (err.code == 11000) err_msg.push(`Username already exist`);
      res.send({err : err_msg.join(',')});
    } else res.send(user)
  })
}
const editUser = (req,res) => {
  let id = req.params.id;
  User.findById(id, (err,user) => {
    if (err) res.send({err: 'Invalid User'})
    else {
      if (typeof req.body.phone != 'undefined') user.phone = req.body.phone;
      if (typeof req.body.password != 'undefined') user.password = req.body.password;
      if (typeof req.body.name != 'undefined') user.name = req.body.name;
      // if (typeof req.body.email != 'undefined') user.email = req.body.email;
      //   if (typeof req.body.username != 'undefined') user.username = req.body.username;
      user.save((err,eduser)=> {res.send(err ? {err: err} : eduser)} );
    }
  })
}
const deleteUser = (req,res) => {
  let id = req.params.id;
  User.findById(id, (err,user) => {
    if (err) res.send({err: 'Invalid User'})
    else user.remove((err,deleted) => {res.send(err? err : deleted)})
  })
}

module.exports = {
  getUsers,
  getUser,
  addUser,
  editUser,
  deleteUser
}