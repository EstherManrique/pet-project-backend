const asyncHandler = require("express-async-handler");
const Reservation = require("../models/reservationModel");
const helpers = require("../helpers/validateHelper");
const accessControl = require('../helpers/accessControl');

// @desc    Get reservations list
// @route   GET /api/reservations
// @access  Private
const getReservations = asyncHandler(async (req, res) => {
  const allowedRoles = await helpers.getMongoRoles(accessControl.permissions.reservations.get);
  if(helpers.compareRoles(allowedRoles, req.user.roleId)) {
    const reservation = await Reservation.find({})
    .populate({
      path: "clientId",
      model: "User",
    })
    .populate({
      path: "serviceId",
      model: "Service",
    })
    .populate({
      path: "storeId",
      model: "Store",
    });
    res.status(200).json({ message: "Get Reservation",
     reservations: reservation });
  } else {
    res.status(403).json({'message': 'Forbidden'});
  }
});

// @desc    Get reservations by storeId
// @route   GET /api/reservations/:id
// @access  Private
const getReservation = asyncHandler(async (req, res) => {
  const allowedRoles = await helpers.getMongoRoles(accessControl.permissions.reservations.get);
  if(helpers.compareRoles(allowedRoles, req.user.roleId)) {
    const reservationId = req.params.id;
    const reservations = await Reservation.find({ storeId: reservationId })
      .populate({
        path: "clientId",
        model: "User",
      })
      .populate({
        path: "storeId",
        model: "Store",
      })
      .populate({
        path: "serviceId",
        model: "Service",
      });
      res.status(200).json({ message: "Get Reservation", reservations: reservations });
  } else {
    res.status(403).json({'message': 'Forbidden'});
  }
})

// @desc    Set reservation
// @route   POST /api/reservation
// @access  Public
const setReservation = asyncHandler(async (req, res) => {
  const { petName, date, status,  clientPhone, clientId, storeId, serviceId } = req.body;
  const newReservation = Reservation({
    petName,
    date,
    status,
    clientPhone,
    clientId,
    storeId,
    serviceId
  });
  await newReservation.save();
  res.status(200).json(newReservation);
});

// @desc    Update reservation
// @route   PUT /api/reservation/:id
// @access  Private
const updateReservation = asyncHandler(async (req, res) => {
  const allowedRoles = await helpers.getMongoRoles(accessControl.permissions.reservations.put);
  if(helpers.compareRoles(allowedRoles, req.user.roleId)) {
    const updateReservationId = req.params.id;
    const params = req.body;
    const reservation = await Reservation.findById(updateReservationId, params);
    if (!reservation) {
      res.status(400);
      throw new Error("Reservation not found");
    };
    const updatedReservation = await Reservation.findByIdAndUpdate(updateReservationId, params, {
      new: true,
    });
    res.status(200).json(updatedReservation);
  } else {
    res.status(403).json({'message': 'Forbidden'});
  }
});

// @desc    Delete reservation
// @route   DELETE /api/reservation/:id
// @access  Private
const deleteReservation = asyncHandler(async (req, res) => {
  const allowedRoles = await helpers.getMongoRoles(accessControl.permissions.reservations.delete);
  if(helpers.compareRoles(allowedRoles, req.user.roleId)) {
    const reservation = await Reservation.findById(req.params.id);
    if (!reservation) {
      res.status(400);
      throw new Error("Reservation not found");
    };
    await reservation.remove()
    res.status(200).json({ id: req.params.id });
  } else {
    res.status(403).json({'message': 'Forbidden'});
  }
});

module.exports = { getReservations, getReservation, setReservation, updateReservation, deleteReservation };