const mongoose = require('mongoose');
let Category = require('../models/category');
let login = require('../helpers/login');

const checkAuth = (req,res, next) => {
  let method = req.method;
  let hasParam = req.path === '/';

  if (req.headers.hasOwnProperty('token')){
    let decoded = login.getUserDetail(req.headers.token);
    if (decoded) {
      if (decoded.role === 'admin' || method === 'GET') next()
      else res.send({err: 'Invalid Access'})
    }
    else res.send({err:'You must login'})
  }
  else if (method === 'GET') next();
  else res.send({err:'You must login'})
}

const getCategories = (req,res) => {
  Category.find({}, (err,categories) => {
    res.send(err ? err : categories);
  })
}
const getCategory = (req,res) => {
  let id = req.params.id;
  Category.findById(id, (err,category) => {
    res.send(err ? err : category);
  })
}
const addCategory = (req,res) => {
  let newcategory = new Category(req.body);
  newcategory.save((err,category) => {
    if (err) {
      let err_msg = [];
      for (let error in err.errors) err_msg.push(err.errors[error].message);
      if (err.code == 11000) err_msg.push(`Category name already exist`);
      res.send({err : err_msg.join(',')});
    } else res.send(category)
  })
}
const editCategory = (req,res) => {
  let id = req.params.id;
  Category.findById(id, (err,category) => {
    if (err) res.send({err: 'Invalid Category'})
    else {
      if (typeof req.body.name !== 'undefined') category.name = req.body.name;
      if (typeof req.body.icon !== 'undefined') category.icon = req.body.icon;
      category.save((err,edcategory)=> {
        if (err) {
          let err_msg = [];
          for (let error in err.errors) err_msg.push(err.errors[error].message);
          if (err.code == 11000) err_msg.push(`Category name already exist`);
          res.send({err : err_msg.join(',')});
        } else res.send(edcategory)
      } );
    }
  })
}
const deleteCategory = (req,res) => {
  let id = req.params.id;
  Category.findById(id, (err,category) => {
    if (err) res.send({err: 'Invalid Category'})
    else category.remove((err,deleted) => {res.send(err? err : deleted)})
  })
}

module.exports = {
  getCategories,
  getCategory,
  addCategory,
  editCategory,
  deleteCategory,
  checkAuth
}