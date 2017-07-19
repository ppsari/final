const mongoose = require('mongoose');
let Props = require('../models/propertySell');
let login = require('../helpers/login');

const checkAuth = (req,res, next) => {
  let method = req.method;
  let hasParam = req.path !== '/';
  let decoded = req.headers.hasOwnProperty('token') ? login.getUserDetail(req.headers.token) : false;
  // console.log(method);
  // console.log(decoded)
  // console.log('masuk switch')
  switch(method) {
    case 'GET' : next(); break;
    case 'PUT' : case 'DELETE' : case 'POST' :
      if (decoded){
        next(); break;
      } else {
        res.send({err: 'You must login'});
      }
      break;
    default: res.send({err: 'You dont have access'}); break;
  }
}

const getNewest = (req,res) => {
  let limit = 10; //req.params.limit || 10;

  Props.find()
  .limit(limit)
  .sort({ createdDate: 'desc' })
  .exec((err,prop) => res.send(err? {err:err} : prop) );

}
const getProps = (req,res) => {
  Props.find()
  .populate({
    path: '_ownerId',
    select: 'username _id',
    match: { _id: { $ne: null }}
  })
  .exec((err,properties) => {
    res.send(err? {err:err} : properties)
  })
}

const getPropsByOwner = (req,res) => {
  let decoded = req.headers.hasOwnProperty('token') ? login.getUserDetail(req.headers.token) : false;
  if (decoded)
    Props.find({_ownerId: decoded._id}, (err,properties) => {
      res.send(err ? {err: err} : properties);
    })
  else res.send({err : 'You dont have access'});
}

const getProp = (req,res) => {
  let id = req.params.id;
  Props.findById(id)
  .populate('_price _categoryId _accessId _roomId')
  .populate({
    path: '_ownerId',
    select: 'username _id'
  })
  .populate({
    path: '_testimonyId',
    populate: {path: '_userId', select: 'username'}
  })
  .exec( (err,property) => {
    // (property._testimonyId).forEach(testi => console.log(testi.username))
    let testimonyId = [];
    if (typeof property._testimonyId !== 'undefined')
    testimonyId  = property._testimonyId.map((testi) => {
      let username = testi._userId.username;
      username = username.split(' ').map(name => {
        let len = name.length;
        let sensor_len = Math.floor(len/2);
        let sensor_start = Math.ceil( (name.length - sensor_len) /2)
        return name.split('').splice(sensor_start,sensor_len, 'x'.repeat(sensor_len)).join('')
      }).join(' ')
      return {username, testimony: testi.testimony}
    })
    property._testimonyId = testimonyId;
    res.send(err? {err:err.message} : property );
  })
}


/*
  searchProps
  1. multiParam
    a. kosong semua ga error  => searchPropsENull
    b. kosong semua error     => searchPropsNNull
  2. withOutPopulate
    a. kosong error           => searchPropENull
    b. kosong ga error        => searchPropNNull
*/

const searchPropsENull = (req,res) => {
  // res.send(req.query.city)
  let regCity  = new RegExp(req.query.city, 'i');
  let find = {city: regCity}
  Props.find(find)
  .populate('_categoryId _accessId _roomId')
  .populate({
    path: '_ownerId',
    select: 'username _id'
  })
  .exec( (err,properties)=> {
    if (err) res.send({err:err})
    else {
      if (req.query.prop !== '') {
        let regProp = new RegExp(req.query.prop, 'i')
        let filtered = properties.filter(property => {
          if ( (regProp.test(property._categoryId.name) || regProp.test(property.name)) ) {
            return property
          }
        })
        res.send(filtered)
      } else res.send(properties)

    }
  })
}
// const searchPropsENull = (req,res) => {
//   let find = {}
//
//   Props.find()
//   .populate('_categoryId _accessId _roomId')
//   .populate({
//     path: '_ownerId',
//     select: 'username _id'
//   })
//   .exec( (err,properties)=> {
//     if (err) res.send({err:err})
//     else {
//       let regCity  = new RegExp(req.query.city, 'i');
//       let regProp = new RegExp(req.query.prop, 'i')
//       let filtered = properties.filter(property => {
//         if ( regCity.test(property.city)||(regProp.test(property._categoryId.name) || regProp.test(property.name)) )
//         return property
//       })
//       res.send(filtered)
//     }
//   })
//
//   // for (let key in req.query)
//   //   if (req.query[key] !== '' && key !='page' && key!= 'limit') find[key] = new RegExp(req.query[key], "i")
//   //   else if (key === 'page' && req.query[key]!='') pageOptions.page = req.query[key] -1 ;
//   //   else if (key === 'limit' && req.query[key]!='') pageOptions.limit = parseInt(req.query[key]);
//   //
//   // Props.count(find, function(err, count) {
//   //   let countQuery = Math.ceil(count / pageOptions.limit);
//   //
//   //   Props.find(find)
//   //   .skip(pageOptions.page * pageOptions.limit)
//   //   .limit(pageOptions.limit)
//   //   .populate('_categoryId _accessId _roomId')
//   //   .populate({
//   //     path: '_ownerId',
//   //     select: 'username _id'
//   //   })
//   //   .exec( (err,property) => {
//   //     if (err) res.send({err:err})
//   //     else {
//   //       //hitung jumlah Room
//   //       let roomTotal = [];
//   //       for (let room in property._roomId)
//   //         roomTotal[room] =  (typeof property._roomId[room] === 'undefined')  ? 1 : (roomTotal[room]+1);
//   //       property.roomTotal = roomTotal;
//   //       // property.pageCount = countQuery;
//   //
//   //       // console.log(property)
//   //       res.send({property,countQuery,totalResult:count});
//   //     }
//   //   })
//   // });
// }

const searchPropsNNull = (req,res) => {
  let find = {}

  for (let key in req.query)
    if (req.query[key] !== '') find[key] = new RegExp(req.query[key], "i")

  if (Object.keys(find).length === 0) res.send({err:'Please insert at least one keyword'})
  else {
    Props.find(find)
    .populate('_price _categoryId _accessId _roomId')
    .populate({path:'_ownerId', select:'username email contact _id'})
    .exec( (err,property) => {
      if (err) res.send({err:err})
      else {
        //hitung jumlah Room
        let roomTotal = [];
        for (let room in property._roomId)
          roomTotal[property._roomId[room].name] =  (typeof property._roomId[property._roomId[room].name] === 'undefined')  ? 1 : (roomTotal[property._roomId[room].name]+1);
        property.roomTotal = roomTotal;
        res.send(property);
      }
    })
  }
}
const searchPropENull = (req,res) => {
  let find = {}

  for (let key in req.query)
    if (req.query[key] !== '') find[key] = new RegExp(req.query[key], "i")

  Props.find(find)
  .populate('_categoryId')
  .exec( (err,property) => {
    if (err) res.send({err:err})
    else {
      //hitung jumlah Room
      let roomTotal = [];
      for (let room in property._roomId)
        roomTotal[room] =  (typeof property._roomId[room] === 'undefined')  ? 1 : (roomTotal[room]+1);
      property.roomTotal = roomTotal;
      res.send(property);
    }

  })
}
const searchPropNNull = (req,res) => {
  let find = {}

  for (let key in req.query)
    if (req.query[key] !== '')
      find[key] = new RegExp(req.query[key], "i")
  if (Object.keys(find).length === 0)
    res.send({err:'Please insert at least one keyword'})
  else {
    Props.find(find)
    .populate('_categoryId')
    .exec( (err,property) => {
      if (err) res.send({err:err})
      else {
        //hitung jumlah Room
        let roomTotal = [];
        for (let room in property._roomId)
          roomTotal[room] =  (typeof property._roomId[room] === 'undefined')  ? 1 : (roomTotal[room]+1);
        property.roomTotal = roomTotal;
        res.send(property);
      }
    })
  }
}

const searchProps = (req,res) => {
  let data = req.query;
  res.send(data);
  // //owner, location, category
  // if (typeof req.params.searchKey === 'undefined') res.send({err: 'Invalid Search Keyword'})
  // else if (typeof req.params.searchValue === 'undefined') res.send({err: 'Invalid Search Value'})
  // else {
  //   let searchValue = new RegExp(req.params.searchValue, "i")
  //   Props.find({
  //     [req.params.searchKey] : searchValue
  //   })
  //   .populate('_price _categoryId _accessId _ownerId')
  //   .exec( (err,property) => {
  //     res.send(err? {err:err.message} : property );
  //   })
  // }
}

const addProp = (req,res) => {
  let propertyDt = req.body;
  let decoded = login.getUserDetail(req.headers.token);
  // propertyDt._ownerId = decoded._id;

  // let property = new Props(propertyDt);
  //
  // property.save((err,newproperty) => {
  //   if (err) {
  //     let err_msg = [];
  //     for (let error in err.errors) err_msg.push(err.errors[error].message);
  //     res.send({err : err_msg.join(',')});
  //   } else res.send(newproperty)
  // })

  let newProp = {
    name: propertyDt.name,
    image: propertyDt.image,
    city: propertyDt.city,
    descr: propertyDt.descr,
    price: {
      amount: propertyDt.price_amount || null,
      descr: propertyDt.price_descr || null
    },
    address: propertyDt.address,
    _ownerId: decoded._id,
    _categoryId: propertyDt._categoryId || null,
    _accessId: propertyDt._accessId || [],
    _roomId: propertyDt._roomId || [],
  }
  newProp.detail = {}
  if (typeof propertyDt.detail_luasBangunan !== 'undefined') newProp.detail.luasBangunan = propertyDt.detail_luasBangunan;
  if (typeof propertyDt.detail_luasTanah !== 'undefined') newProp.detail.detail_luasTanah = propertyDt.detail_detail_luasTanah;
  if (typeof propertyDt.detail_perabotan !== 'undefined') newProp.detail.perabotan = propertyDt.detail_perabotan;
  if (typeof propertyDt.detail_listrik !== 'undefined') newProp.detail.listrik = propertyDt.detail_listrik;
  if (typeof propertyDt.detail_lantai !== 'undefined') newProp.detail.lantai = propertyDt.detail_lantai;
  if (typeof propertyDt.detail_fasilitas !== 'undefined') newProp.detail.fasilitas = propertyDt.detail_fasilitas;

  if (typeof propertyDt.lng !== 'undefined' && typeof propertyDt.lat !== 'undefined' ) {
    newProp.location= {
      lng: propertyDt.lng,
      lat: propertyDt.lat
    }
  }

  let property = new Props(newProp);

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
  let decoded = login.getUserDetail(req.headers.token);

  let propertyDt = req.body;

  Props.findById(id, (err,property) => {
    if (err) res.send({err: 'Invalid Property'})
    else if (decoded._id != property._ownerId) res.send({err : 'Invalid Access'})
    else {

      property.detail = {}
      if (typeof req.body.name != 'undefined') property.name = propertyDt.name;
      if (typeof propertyDt.image != 'undefined') property.image = propertyDt.image;
      if (typeof propertyDt.city != 'undefined') property.city = propertyDt.city;
      if (typeof propertyDt.descr != 'undefined') property.descr = propertyDt.descr;
      if (typeof propertyDt.price_amount != 'undefined') property.price.amount = propertyDt.price_amount;
      if (typeof propertyDt.price_descr != 'undefined') property.price.descr = propertyDt.price_descr;

      if (typeof propertyDt.detail_luasBangunan !== 'undefined') property.detail.luasBangunan = propertyDt.detail_luasBangunan;
      if (typeof propertyDt.detail_luasTanah !== 'undefined') property.detail.detail_luasTanah = propertyDt.detail_detail_luasTanah;
      if (typeof propertyDt.detail_perabotan !== 'undefined') property.detail.perabotan = propertyDt.detail_perabotan;
      if (typeof propertyDt.detail_listrik !== 'undefined') property.detail.listrik = propertyDt.detail_listrik;
      if (typeof propertyDt.detail_lantai !== 'undefined') property.detail.lantai = propertyDt.detail_lantai;
      if (typeof propertyDt.detail_fasilitas !== 'undefined') property.detail.fasilitas = propertyDt.detail_fasilitas;
      if (typeof propertyDt.address != 'undefined') property.address = propertyDt.address;

      if (typeof propertyDt._categoryId !== 'undefined') property._categoryId = propertyDt._categoryId;
      if (typeof propertyDt._accessId !== 'undefined') property._accessId = propertyDt._accessId;
      if (typeof propertyDt._roomId !== 'undefined') property._roomId = propertyDt._roomId;

      if (typeof propertyDt.lng !== 'undefined' && typeof propertyDt.lat !== 'undefined' ) {
        property.location= {
          lng: propertyDt.lng,
          lat: propertyDt.lat
        }
      }

      property.save((err,edproperty)=> {
        if (err) {
          let err_msg = [];
          for (let error in err.errors) err_msg.push(err.errors[error].message);
          res.send({err : err_msg.join(',')});
        } else res.send(edproperty)
      } );
    }
  })

  // Props.findById(id, (err,property) => {
  //   if (err) res.send({err: 'Invalid Property'})
  //   else if (decoded._id != property._ownerId) res.send({err : 'Invalid Access'})
  //   else {
  //     if (typeof req.body.name != 'undefined') property.name = req.body.name;
  //     if (typeof req.body.image != 'undefined') property.image = req.body.image;
  //     if (typeof req.body.city != 'undefined') property.city = req.body.city;
  //     if (typeof req.body.descr != 'undefined') property.descr = req.body.descr;
  //     if (typeof req.body['price.amount'] != 'undefined') property.price.amount = req.body['price.amount'];
  //     if (typeof req.body.isActive != 'undefined') property.isActive = req.body.isActive;
  //     // if (typeof req.body._ownerId != 'undefined') property._ownerId = req.body._ownerId;
  //     property._accessId = (typeof req.body._accessId != 'undefined') ? req.body._accessId : [];
  //     if (typeof req.body.address != 'undefined') property.address = req.body.address;
  //     // property._testimonyId = (typeof req.body._testimonyId != 'undefined') ? req.body._testimonyId : [];
  //
  //     property.save((err,edproperty)=> {
  //       if (err) {
  //         let err_msg = [];
  //         for (let error in err.errors) err_msg.push(err.errors[error].message);
  //         res.send({err : err_msg.join(',')});
  //       } else res.send(edproperty)
  //     } );
  //   }
  // })
}
const deleteProp = (req,res) => {
  let id = req.params.id;
  let decoded = login.getUserDetail(req.headers.token);

  Props.findById(id, (err,property) => {
    if (err) res.send({err: 'Invalid Property'})
    else if (decoded._id != property._ownerId) res.send({err : 'Invalid Access'})
    else property.remove((err,deleted) => {res.send(err? err : deleted)})
  })
}

module.exports = {
  getProps,
  getProp,
  addProp,
  editProp,
  deleteProp,
  checkAuth,
  // searchProps,
  searchPropsENull,
  searchPropsNNull,
  searchPropENull,
  searchPropNNull,
  getNewest,
  getPropsByOwner
}