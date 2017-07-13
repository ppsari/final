const mongoose = require('mongoose');
let Trans = require('../models/transaction');

const getTranss = (req,res) => {
  Trans.find({}, (err,transs) => {
    res.send(err ? err : transs);
  })
}
const getTrans = (req,res) => {
  let id = req.params.id;
  Trans.findById(id)
  .populate('_userId _categoryId')
  .populate({
    path: 'connections._propertyId',
    populate: {path: '_accessId'}
  })
  .exec( (err,trans) => {
    res.send(err? {err:err} : trans );
  })
}

const addTrans = (req,res) => {
  let trans = new Trans(req.body);
  trans.save((err,newtrans) => {
    if (err) {
      let err_msg = [];
      for (let error in err.errors) err_msg.push(err.errors[error].message);
      res.send({err : err_msg.join(',')});
    } else res.send(newtrans)
  })
}

module.exports = {
  getTranss,
  getTrans,
  addTrans
}