const mongoose = require('mongoose');
let User = require('../models/user');
let login = require('../helpers/login');

const checkAuth = (req,res, next) => {
  let method = req.method;
  let hasParam = req.path !== '/';
  if (req.headers.hasOwnProperty('token')){
    let decoded = login.getUserDetail(req.headers.token);
    if (decoded) {
      if (!hasParam) {
        if ( (method === 'GET' || method === 'POST') && decoded.role === 'admin'){ next();}
        else res.send({err: 'Invalid Access'})
      }
      else {
        let id = req.path.substr(1);
        switch(method) {
          case 'GET' : next(); break;
          case 'PUT' : case 'POST' :
            // console.log(decoded.role === 'admin' || decoded._id === `${id}`)
            if (decoded.role === 'admin' || decoded._id === `${id}`) { console.log(decoded._id); next(); break;}
          case 'DELETE' :
            if (decoded.role === 'admin') { next(); break; }
          default:
            res.send({err: 'You dont have access'}); break;
        }
      }
    } else res.send({err:'You must login'})
  }
  else if (method === 'GET' && hasParam) next();
  else res.send({err:'You must login'})
}

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
      let err_msg = '';
      for (let error in err.errors) err_msg+= err.errors[error].message+',';
      if (err.code == 11000) err_msg+=`Username already exist`;
      res.send({err : err_msg});
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
      if (typeof req.body.username != 'undefined') user.username = req.body.username;
      user.save((err,eduser)=> {
      // if (typeof req.body.role != 'undefined') user.role = req.body.role;
        if (err) {
          let err_msg = '';
          for (let error in err.errors) err_msg+= err.errors[error].message+',';
          if (err.code == 11000) err_msg+=`Username already exist`;
          res.send({err : err_msg});
        } else res.send(eduser)
      } );
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
  deleteUser,
  checkAuth
}