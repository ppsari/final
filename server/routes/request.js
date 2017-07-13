'use strict'
const express = require('express');
let router = express.Router();
const requestCtrl = require('../controllers/requestCtrl');

router.get('/',requestCtrl.getRequests ); //
router.get('/:id',requestCtrl.getRequest); //
router.post('/',requestCtrl.addRequest); //
router.delete('/:id',requestCtrl.deleteRequest); //

module.exports = router;