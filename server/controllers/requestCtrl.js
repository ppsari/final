const mongoose = require('mongoose');

let Trans = require('../models/transaction');
let Request = require('../models/request');
let User = require('../models/user');
let login = require('../helpers/login');
let contact = require('../helpers/contact');
// pas dia approve
let PropertySell = require('../models/propertySell');
let PropertyRent = require('../models/propertyRent');

const checkAuth = (req,res, next) => {
  let method = req.method;
  // let hasParam = req.path !== '/';

  if (req.headers.hasOwnProperty('token')){
    let decoded = login.getUserDetail(req.headers.token);
    if (decoded) next();
    else res.send({err:'You must login'})
  } else res.send({err:'You must login'})
}

const getRequests = (req,res) => {
  let decoded = login.getUserDetail(req.headers.token);
  if (decoded) {
    Request.find({}, (err,requests) => {
      res.send(err ? err : requests);
    })
  } else res.send({err: 'You dont have access'})

}

const getRequestsByBuyer = (req,res) => {
  let decoded = login.getUserDetail(req.headers.token);

  Request.find({_userId: decoded._id})
  .populate('_userId _sellerId')
  .populate('connections._propertyId')
  .exec( (err,requests) => {
    let filtered = requests.filter(rq => {if(rq._userId !== null && rq._sellerId !== null && rq.connections._propertyId !== null) {return rq} })
    res.send(err? {err:err} : filtered );
  })

}
const getRequestsBySeller = (req,res) => {
  let decoded = login.getUserDetail(req.headers.token);

  Request.find({_sellerId: decoded._id})
  // .populate('_userId _sellerId')
  .populate({path:'_userId', select:'phone username email name _id'})
  .populate({path:'_sellerId', select:'phone username email name _id'})
  .populate('connections._propertyId')
  .exec( (err,requests) => {
    let filtered = requests.filter(rq => {if(rq._userId !== null && rq._sellerId !== null && rq.connections._propertyId !== null) {return rq} })
    res.send(err? {err:err} : filtered );
  })
}

const getRequest = (req,res) => {
  let decoded = login.getUserDetail(req.headers.token);
  let id = req.params.id;
  Request.findById(id)
  .populate('_sellerId _userId')
  .populate('connections._propertyId')
  .exec( (err,request) => {
    if (err) res.send(err)
    else if (request._sellerId._id == decoded._id || request._userId._id == decoded._id || decoded.role === 'admin') res.send(request)
    else res.send({err:'You dont have access'})
  })
}

const addRequest = (req,res) => {
  let requestDt = req.body;
  let decoded = login.getUserDetail(req.headers.token);
  requestDt._userId = decoded._id;
  let Prop = requestDt.kind == 'PropertyRent' ? PropertyRent: PropertySell;
  if (requestDt._sellerId === requestDt._userId) res.send({err:'You cant rent/sell your own product'})
  else {

    let body =  (typeof requestDt.note !== 'undefined' && requestDt.note !== '' ? requestDt.note: 'You got a request!')
    let msg = {
      subject: 'There is a request for you',
      body: body
    }

    Prop.findById(requestDt._propertyId)
    .populate({path:'_ownerId', select:'phone username email name'})
    .exec((err,prop)=>{
      if (err){ res.send({err: 'Invalid Property'}); }
      // else if(requestDt.kind === 'PropertyRent'){
        // let start = new Date(requestDt['connections.start']);
        // let end = new Date(requestDt['connections.end']);
        //cek ketersediaan
        // let idx = prop.renter.findIndex(r => ( (start >= r.start && start <= r.end) || (end >= r.start && end <= r.end)  ))
        // if (idx > -1) res.send({err:'Booking Date are not available'})
      // }

      let newrequest = new Request({
        note: requestDt.note,
        connections: {
          kind: requestDt.kind,
          _propertyId: requestDt._propertyId
        },
        _sellerId : requestDt._sellerId,
        _userId: requestDt._userId
      });
      // console.log(prop._ownerId);
      newrequest.save((err,request) => {
        if (err) res.send({err:err})
        else {
          // console.log(prop._ownerId);
          if (typeof prop._ownerId !== 'undefined') {
            contact.contact(prop._ownerId,msg);

          }
          res.send(request);

        }
      })
    })

  }
}


const deleteRequest = (req,res) => {
  let requestDt = req.body;
  let decoded = login.getUserDetail(req.headers.token);
  let id = req.params.id;

  // Request.collection.drop();

  Request.findById(id, (err,request) => {
    if (err) res.send({err: 'Invalid Request'})
    else if (request._sellerId != decoded._id && decoded.role !== 'admin') res.send({err:'Invalid access'});
    else {
      let subject = 'Your request is ' +requestDt.response;
      let msg = { subject: subject  }
      User.findById(request._userId, (err,user)=> {
        // console.log('masuk find by id')
        if (err) res.send({err:err})
        else if (requestDt.response === 'approved') {
          msg.body = `Your request has been approved. For further information please contact ${decoded.name} - ${decoded.phone} / ${decoded.email}`

          let transDt = req.body;
          transDt._userId = request._userId;
          transDt._sellerId = decoded._id;
          let trans = new Trans(transDt);

          let Prop = request.connections.kind === 'PropertyRent'? PropertyRent : PropertySell;

          Prop.findById( request.connections._propertyId, (err,prop) => {
            if (err) res.send({err : 'Invalid Property'});
            else {
            // else if (request.connections.kind === 'PropertyRent') {
              // let idx = prop.renter.findIndex(r => ( (start >= r.start && start <= r.end) || (end >= r.start && end <= r.end)  ))
              // if (idx > -1) res.send({err:'Booking Date are not available'})
              // else {
                // trans.connections.detail = {
                //     start: request.connections.detail.start,
                //     end: request.connections.detail.end
                //   }
                trans.save((err,newtrans) => {
                  if (err) {
                    let err_msg = [];
                    for (let error in err.errors) err_msg.push(err.errors[error].message);
                    res.send({err : err_msg.join(',')});
                  }
                  // else {
                    // prop.renter.push({
                    //   start: request.connections.detail.start,
                    //   end: request.connections.detail.end,
                    //   _renterId: request._userId
                    // });
                    // prop.rentercount = prop.rentercount + 1;
                    // prop.save((err,nprop) => {
                    //   res.send(err? {err:err} : newtrans);
                    //   contact.contact(user,msg);
                    // })
                  // }
                })
              // }
            }
            //else valid
          })
          //end propertyFindById
        }
        else {
          msg.body = `Your request has been rejected `;
          msg.body += (typeof requestDt.note === 'undefined' || requestDt.note === '') ? '': `because ${requestDt.note}`;

        }
        // console.log(user);

        request.remove((err,deleted) => {
          if (err) {res.send({err : err});}
          else {
            contact.contact(user,msg);
            res.send(deleted)
          }
        })

      })
      //end UserfindById
    }
  })
}

module.exports = {
  getRequests,
  getRequest,
  addRequest,
  deleteRequest,
  getRequestsByBuyer,
  getRequestsBySeller,
  checkAuth
}

