'use strict'

const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/reservationController');
const { validateSave, validateUpdate, validateDelete, validateListStore } = require('../validators/reservation');

const { protect } = require('../middleware/authMiddleware');

router.route('/').get(protect, reservationController.getReservations);
router.route('/:id').get(validateListStore, protect, reservationController.getReservation);
router.post('/', validateSave, reservationController.setReservation);
router.route('/:id').put(validateUpdate, protect, reservationController.updateReservation).delete(validateDelete, protect, reservationController.deleteReservation);

module.exports = router;