'use strict'
const express = require('express');
let router = express.Router();
const accessCtrl = require('../controllers/accessCtrl');

router.use(accessCtrl.checkAuth); //v

router.get('/',accessCtrl.getAccesses ); //v
router.get('/:id',accessCtrl.getAccess); //v
router.post('/',accessCtrl.addAccess); //v
router.put('/:id',accessCtrl.editAccess); //v
router.delete('/:id',accessCtrl.deleteAccess); //v

module.exports = router;