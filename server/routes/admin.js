'use strict'
const express = require('express');
let router = express.Router();
const adminCtrl = require('../controllers/adminCtrl');

router.get('/',adminCtrl.getAdmins ); //v
router.get('/:id',adminCtrl.getAdmin); //v
router.post('/',adminCtrl.addAdmin); //v
router.put('/:id',adminCtrl.editAdmin); //v
router.delete('/:id',adminCtrl.deleteAdmin); //v

module.exports = router;