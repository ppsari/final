'use strict'
const express = require('express');
let router = express.Router();
const transactionCtrl = require('../controllers/transactionCtrl');

router.use(transactionCtrl.checkAuth); //v

router.get('/',transactionCtrl.getTranss ); //v
router.get('/buyer/',transactionCtrl.getTranssByBuyer ); //v
router.get('/seller/',transactionCtrl.getTranssBySeller); //v
router.get('/:id',transactionCtrl.getTrans); //v
router.post('/',transactionCtrl.addTrans); //v

module.exports = router;