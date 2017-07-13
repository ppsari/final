'use strict'
const express = require('express');
let router = express.Router();
const propertySellCtrl = require('../controllers/propertySellCtrl');

router.get('/',propertySellCtrl.getProps ); //
router.get('/:id',propertySellCtrl.getProp); //
router.post('/',propertySellCtrl.addProp); //
router.put('/:id',propertySellCtrl.editProp); //
router.delete('/:id',propertySellCtrl.deleteProp); //

module.exports = router;