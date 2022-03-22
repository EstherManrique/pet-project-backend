'use strict'

const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/reservationController');

const { protect } = require('../middleware/authMiddleware');

router.route('/').get(protect, reservationController.getReservations);
router.route('/:id').get(protect, reservationController.getReservation);
router.post('/', reservationController.setReservation);
router.route('/:id').put(protect, reservationController.updateReservation).delete(protect, reservationController.deleteReservation);

module.exports = router;