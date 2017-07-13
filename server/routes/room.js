'use strict'
const express = require('express');
let router = express.Router();
const roomCtrl = require('../controllers/roomCtrl');

router.get('/',roomCtrl.getRooms ); //v
router.get('/:id',roomCtrl.getRoom); //v
router.post('/',roomCtrl.addRoom); //v
router.put('/:id',roomCtrl.editRoom); //v
router.delete('/:id',roomCtrl.deleteRoom); //v

module.exports = router;
