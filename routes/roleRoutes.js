'use strict'

const express = require('express');
const router = express.Router();
const roleController = require('../controllers/roleController');
const { validateSave, validateUpdate, validateDelete } = require('../validators/role');

const { protect } = require('../middleware/authMiddleware');

router.route('/').get(protect, roleController.getRoles).post(validateSave, protect, roleController.setRole);
router.route('/:id').put(validateUpdate, protect, roleController.updateRole).delete(validateDelete, protect, roleController.deleteRole);

module.exports = router;