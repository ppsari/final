'use strict'
const express = require('express');
let router = express.Router();
const categoryCtrl = require('../controllers/categoryCtrl');

router.use(categoryCtrl.checkAuth); //v

router.get('/',categoryCtrl.getCategories ); //v
router.get('/:id',categoryCtrl.getCategory); //v
router.post('/',categoryCtrl.addCategory); //v
router.put('/:id',categoryCtrl.editCategory); //v
router.delete('/:id',categoryCtrl.deleteCategory); //v

module.exports = router;