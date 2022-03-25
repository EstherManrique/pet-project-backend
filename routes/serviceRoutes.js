'use strict'

const express = require('express');
const router = express.Router();
const serviceController = require('../controllers/serviceController');
const { validateSave, validateUpdate, validateDelete } = require('../validators/service')

const { protect } = require('../middleware/authMiddleware');

router.get('/', serviceController.getServices);
router.get('/:id', serviceController.getService);
router.route('/').post(validateSave, protect, serviceController.setService);
router.route('/:id').put(validateUpdate, protect, serviceController.updateService).delete(validateDelete, protect, serviceController.deleteService);

module.exports = router;