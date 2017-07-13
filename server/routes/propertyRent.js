'use strict'
const express = require('express');
let router = express.Router();
const propertyRentCtrl = require('../controllers/propertyRentCtrl');

router.get('/',propertyRentCtrl.getProps ); //v
router.get('/:id',propertyRentCtrl.getProp); //v
router.post('/',propertyRentCtrl.addProp); //v
router.put('/:id',propertyRentCtrl.editProp); //v
router.delete('/:id',propertyRentCtrl.deleteProp); //v

module.exports = router;