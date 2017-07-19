'use strict'
const express = require('express');
let router = express.Router();
const propertyRentCtrl = require('../controllers/propertyRentCtrl');

router.use(propertyRentCtrl.checkAuth)

router.get('/searchENull',propertyRentCtrl.searchPropsENull)
router.get('/searchPropsNNull',propertyRentCtrl.searchPropsNNull)
router.get('/searchPropENull',propertyRentCtrl.searchPropENull)
router.get('/searchPropNNull',propertyRentCtrl.searchPropNNull)
router.get('/owner',propertyRentCtrl.getPropsByOwner ); //


router.get('/hot',propertyRentCtrl.getHot ); //
router.get('/newest',propertyRentCtrl.getNewest); //v
router.get('/',propertyRentCtrl.getProps ); //v
router.get('/:id',propertyRentCtrl.getProp); //v
router.post('/',propertyRentCtrl.addProp); //v
router.put('/:id',propertyRentCtrl.editProp); //v
router.delete('/:id',propertyRentCtrl.deleteProp); //v


module.exports = router;