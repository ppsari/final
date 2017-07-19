'use strict'
const express = require('express');
let router = express.Router();
const requestCtrl = require('../controllers/requestCtrl');

router.use(requestCtrl.checkAuth);

router.post('/delete/:id',requestCtrl.deleteRequest); //
router.get('/',requestCtrl.getRequestsBySeller ); //v
router.get('/:id',requestCtrl.getRequest); //v
router.post('/',requestCtrl.addRequest); //v

module.exports = router;