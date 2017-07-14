'use strict'
const express = require('express');
let router = express.Router();
const roomRentCtrl = require('../controllers/roomRentCtrl');


router.use(roomRentCtrl.checkAuth)

router.get('/all/:_propertyId',roomRentCtrl.getRooms ); //v
router.get('/:_roomId',roomRentCtrl.getRoom); //v
router.post('/:_propertyId',roomRentCtrl.addRoom); //v
router.put('/:_roomId',roomRentCtrl.editRoom); //v
router.delete('/:_roomId',roomRentCtrl.deleteRoom); //v

module.exports = router;
