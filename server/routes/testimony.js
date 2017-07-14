'use strict'
const express = require('express');
let router = express.Router();
const testimonyCtrl = require('../controllers/testimonyCtrl');

router.use(testimonyCtrl.checkAuth)

router.get('/all/:_propertyId',testimonyCtrl.getTestimonys ); //v
router.get('/:_testimonyId',testimonyCtrl.getTestimony); //v
router.post('/:_propertyId',testimonyCtrl.addTestimony); //v
router.delete('/:_testimonyId',testimonyCtrl.deleteTestimony); //v

module.exports = router;
