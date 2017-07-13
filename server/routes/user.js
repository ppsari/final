'use strict'
const express = require('express');
let router = express.Router();
const userCtrl = require('../controllers/userCtrl');

router.use(userCtrl.checkAuth); //v

router.get('/',userCtrl.getUsers ); //v
router.get('/:id',userCtrl.getUser); //v
router.post('/',userCtrl.addUser); //v
router.put('/:id',userCtrl.editUser); //v
router.delete('/:id',userCtrl.deleteUser); //v

module.exports = router;