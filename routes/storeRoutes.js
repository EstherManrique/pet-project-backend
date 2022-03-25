'use strict'

const express = require('express');
const router = express.Router();
const storeController = require('../controllers/storeController');
const { validateSave, validateUpdate, validateDelete } = require('../validators/store')

const { protect } = require('../middleware/authMiddleware');

router.get('/', storeController.getStores);
router.get('/:id', storeController.getStore);
router.route('/').post(validateSave, protect, storeController.setStore);
router.route('/:id').put(validateUpdate, protect, storeController.updateStore).delete(validateDelete, protect, storeController.deleteStore);

module.exports = router;