const mongoose = require('mongoose');
let Testimony = require('../models/testimony');
let PropertyRent = require('../models/propertyRent');
let login = require('../helpers/login');

const checkAuth = (req,res, next) => {
  let method = req.method;
  let hasParam = req.path !== '/';

  // if (method === 'GET') next();
  // else res.send({err:'You must login'})
  if (req.headers.hasOwnProperty('token')){
    let decoded = login.getUserDetail(req.headers.token);
    if (decoded) next();
    else res.send({err:'You must login'})
  } else res.send({err:'You must login'})
}

const getTestimonys = (req,res) => {
  Testimony.find({_propertyId: req.params._propertyId})
  .populate('_userId _propertyId')
  .exec( (err,testimony) => {
    res.send(err? {err:err} : testimony );
  })
}
const getTestimony = (req,res) => {
  let id = req.params._testimonyId;
  Testimony.findById(id)
  .populate('_userId _propertyId')
  .exec( (err,testimony) => {
    // console.log("&&&&&&&&&&&&&######## testimony Ctrl ########################3&");
    // console.log(testimony);
    res.send(err? {err:err} : testimony );
  })
}
const addTestimony = (req,res) => {
  let decoded = login.getUserDetail(req.headers.token);
  let testimony = new Testimony({
    testimony: req.body.testimony,
    _userId: decoded._id,//token
    _propertyId: req.params._propertyId
  });
  testimony.save((err,newtestimony) => {
    if (err) res.send({err: 'Invalid Request'})
    else {
      PropertyRent.findById(newtestimony._propertyId, (err, data) => {
        if (err) res.send({err: 'Invalid Request'})
        else {
          // console.log('[[[[[[[[[[[[[[[[[[[[[[ '+data+' ]]]]]]]]]]]]]]]]]]]]]]');
          if(data._ownerId == newtestimony._userId) res.send({err: "You can't give testimony on your own property" })
          else{
            PropertyRent.update({_id: newtestimony._propertyId},{$push: {_testimonyId: newtestimony._id}}, {new: true, safe: true, upsert: true}).exec((error, result)=> {
              if(error) {
                res.send(error)
              } else {
                res.send(newtestimony)
              }
            })
          }
        }
      })
    }
  })
}

const deleteTestimony = (req,res) => {
  let decoded = login.getUserDetail(req.headers.token);
  let id = req.params._testimonyId;
  Testimony.findById(id, (err,request) => {
    // console.log("===== MASUK decoded =====",decoded);
    if (err) res.send({err: 'Invalid Request'})
    else if (request._userId != decoded._id) res.send({err:'Invalid access'});
    else {
      // console.log("===== MASUK request =====",request);
      PropertyRent.update({_id: request._propertyId}, { $pullAll : [{_testimonyId: [request._id]}] }).exec((error, result)=> {
        if(error) {
          // console.log("-----------"+error+"-----------");
          res.send(error)
        } else {
          Testimony.findByIdAndRemove(id, (err,data)=> {
            // console.log("===== MASUK 2 =====");
            // console.log(data);
            err ? res.send(err) : res.send(data)
          })
        }
      })
    }
  })
}


module.exports = {
  getTestimonys,
  getTestimony,
  addTestimony,
  deleteTestimony,
  checkAuth
}
