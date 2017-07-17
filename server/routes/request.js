'use strict'
const express = require('express');
let router = express.Router();
const requestCtrl = require('../controllers/requestCtrl');

router.use(requestCtrl.checkAuth);

router.get('/',requestCtrl.getRequestsBySeller ); //v
router.get('/:id',requestCtrl.getRequest); //v
router.post('/',requestCtrl.addRequest); //v
router.delete('/:id',requestCtrl.deleteRequest); //

module.exports = router;