'use strict'

const express = require('express');
const router = express.Router();
const storeController = require('../controllers/storeController');

const { protect } = require('../middleware/authMiddleware');

router.get('/', storeController.getStores);
router.get('/:id', storeController.getStore);
router.route('/').post(protect, storeController.setStore);
router.route('/:id').put(protect, storeController.updateStore).delete(protect, storeController.deleteStore);

module.exports = router;