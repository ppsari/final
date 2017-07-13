'use strict'
const express = require('express');
let router = express.Router();
const testimonyCtrl = require('../controllers/testimonyCtrl');

router.get('/',testimonyCtrl.getTestimonys ); //v
router.get('/:id',testimonyCtrl.getTestimony); //v
router.post('/',testimonyCtrl.addTestimony); //v

module.exports = router;
