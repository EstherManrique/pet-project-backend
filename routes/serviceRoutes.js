'use strict'

const express = require('express');
const router = express.Router();
const serviceController = require('../controllers/serviceController');

const { protect } = require('../middleware/authMiddleware');

router.get('/', serviceController.getServices);
router.get('/:id', serviceController.getService);
router.route('/').post(protect, serviceController.setService);
router.route('/:id').put(protect, serviceController.updateService).delete(protect, serviceController.deleteService);

module.exports = router;