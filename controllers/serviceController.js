const asyncHandler = require("express-async-handler");
const helpers = require("../helpers/validateHelper");
const accessControl = require('../helpers/accessControl');
const Service = require("../models/serviceModel");

// @desc    Get services list
// @route   GET /api/services
// @access  Public
const getServices = asyncHandler(async (req, res) => {
  const services = await Service.find({});
  res.status(200).json({ message: "Get Services", services });
});

// @desc    Get service by ID
// @route   GET /api/services/:id
// @access  Public
const getService = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const service = await Service.findById(id);
  res.status(200).json({ message: "Get Service", service });
});

// @desc    Set service
// @route   POST /api/services
// @access  Private
const setService = asyncHandler(async (req, res) => {
  const allowedRoles = await helpers.getMongoRoles(accessControl.permissions.services.post);
  if (helpers.compareRoles(allowedRoles, req.user.roleId)) {
    const { name, description, price } = req.body;
    if(!name || !description || !price) {
      res.status(400).json({'message': 'Please fill all the fields.'});  
    }
    const newService = Service({
      name,
      description,
      price,
    });
    await newService.save();
    res.status(200).json(newService);
  } else {
    res.status(403).json({'message': 'Forbidden'});
  }
});

// @desc    Update services
// @route   PUT /api/services/:id
// @access  Private
const updateService = asyncHandler(async (req, res) => {
  const allowedRoles = await helpers.getMongoRoles(accessControl.permissions.services.put);
  if (helpers.compareRoles(allowedRoles, req.user.roleId)) {
    const updateServiceId = req.params.id;
    const params = req.body;
    const service = await Service.findById(updateServiceId, params);
    if (!service) {
      res.status(400);
      throw new Error("Service not found");
    };
    const updatedService = await Service.findByIdAndUpdate(updateServiceId, params, {
      new: true,
    });
    res.status(200).json(updatedService);
  } else {
    res.status(403).json({'message': 'Forbidden'});
  }
});

// @desc    Delete service
// @route   DELETE /api/services/:id
// @access  Private
const deleteService = asyncHandler(async (req, res) => {
  const allowedRoles = await helpers.getMongoRoles(accessControl.permissions.services.delete);
  if (helpers.compareRoles(allowedRoles, req.user.roleId)) {
    const service = await Service.findById(req.params.id);
    if (!service) {
      res.status(400);
      throw new Error("Service not found");
    };
    await service.remove()
    res.status(200).json({ id: req.params.id });
  } else {
    res.status(403).json({'message': 'Forbidden'});
  }
});

module.exports = { getServices, getService, setService, updateService, deleteService };
