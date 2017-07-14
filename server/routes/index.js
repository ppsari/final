'use strict'
const express = require('express');
let router = express.Router();
const loginCtrl = require('../controllers/loginCtrl');

router.get('/', (req,res) => {res.send('alive')} );

router.post('/login',loginCtrl.login); //
router.post('/register',loginCtrl.register); //
router.post('/seedUser',loginCtrl.seedUser); //

module.exports = router;