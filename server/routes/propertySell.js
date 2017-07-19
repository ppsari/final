'use strict'
const express = require('express');
let router = express.Router();
const propertySellCtrl = require('../controllers/propertySellCtrl');

router.use(propertySellCtrl.checkAuth)

router.get('/searchENull',propertySellCtrl.searchPropsENull)
router.get('/searchPropsNNull',propertySellCtrl.searchPropsNNull)
router.get('/searchPropENull',propertySellCtrl.searchPropENull)
router.get('/searchPropNNull',propertySellCtrl.searchPropNNull)
router.get('/owner',propertySellCtrl.getPropsByOwner ); //


router.get('/newest',propertySellCtrl.getNewest); //
router.get('/',propertySellCtrl.getProps ); //
router.get('/:id',propertySellCtrl.getProp); //
router.post('/',propertySellCtrl.addProp); //
router.put('/:id',propertySellCtrl.editProp); //
router.delete('/:id',propertySellCtrl.deleteProp); //

module.exports = router;