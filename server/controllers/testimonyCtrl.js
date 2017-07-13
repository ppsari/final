const mongoose = require('mongoose');
let Testimony = require('../models/testimony');

const getTestimonys = (req,res) => {
  Testimony.find({}, (err,testimonys) => {
    res.send(err ? err : testimonys);
  })
}
const getTestimony = (req,res) => {
  let id = req.params.id;
  Testimony.findById(id)
  .populate('connections._propertyId')
  .exec( (err,testimony) => {
    res.send(err? {err:err} : testimony );
  })
}
const addTestimony = (req,res) => {
  let testimony = new Testimony(req.body);
  testimony.save((err,newtestimony) => {
    if (err) {
      let err_msg = [];
      for (let error in err.errors) err_msg.push(err.errors[error].message);
      res.send({err : err_msg.join(',')});
    } else res.send(newtestimony)
  })
}

module.exports = {
  getTestimonys,
  getTestimony,
  addTestimony
}
