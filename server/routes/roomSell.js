'use strict'
const express = require('express');
let router = express.Router();
const roomSellCtrl = require('../controllers/roomSellCtrl');

router.use(roomSellCtrl.checkAuth)

router.get('/all/:_propertyId',roomSellCtrl.getRooms ); //v
router.get('/:_roomId',roomSellCtrl.getRoom); //v
router.post('/:_propertyId',roomSellCtrl.addRoom); //v
router.put('/:_roomId',roomSellCtrl.editRoom); //v
router.delete('/:_roomId',roomSellCtrl.deleteRoom); //v

module.exports = router;
