'use strict'
const express = require('express');
let router = express.Router();
const transactionCtrl = require('../controllers/transactionCtrl');

router.get('/',transactionCtrl.getTranss ); //v
router.get('/:id',transactionCtrl.getTrans); //v
router.post('/',transactionCtrl.addTrans); //v

module.exports = router;