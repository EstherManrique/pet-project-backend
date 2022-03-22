const asyncHandler = require("express-async-handler");
const Store = require("../models/storeModel");
const helpers = require("../helpers/validateHelper");
const accessControl = require('../helpers/accessControl');

// @desc    Get stores list
// @route   GET /api/stores
// @access  Public
const getStores = asyncHandler(async (req, res) => {
  const stores = await Store.find({});
  res.status(200).json({ message: "Get Stores", stores });
});

// @desc    Get store by ID
// @route   GET /api/stores/:id
// @access  Public
const getStore = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const store = await Store.findById(id);
  res.status(200).json({ message: "Get Store", store });
});

// @desc    Set store
// @route   POST /api/stores
// @access  Private
const setStore = asyncHandler(async (req, res) => {
  const allowedRoles = await helpers.getMongoRoles(accessControl.permissions.stores.post);
  if (helpers.compareRoles(allowedRoles, req.user.roleId)) {
    const { name, address, email,  description, phone, location } = req.body;
    const newStore = Store({
      name,
      address,
      email,
      description,
      phone,
      location
    });
    await newStore.save();
    res.status(200).json(newStore);
  } else {
    res.status(403).json({'message': 'Forbidden'});
  }
});

// @desc    Update store
// @route   PUT /api/stores/:id
// @access  Private
const updateStore = asyncHandler(async (req, res) => {
  const allowedRoles = await helpers.getMongoRoles(accessControl.permissions.stores.put);
  if (helpers.compareRoles(allowedRoles, req.user.roleId)) {
    const updateStoreId = req.params.id;
    const params = req.body;
    const store = await Store.findById(updateStoreId, params);
    if (!store) {
      res.status(400);
      throw new Error("Store not found");
    };
    const updatedStore = await Store.findByIdAndUpdate(updateStoreId, params, {
      new: true,
    });
    res.status(200).json(updatedStore);
  } else {
    res.status(403).json({'message': 'Forbidden'});
  }
});

// @desc    Delete store
// @route   DELETE /api/stores/:id
// @access  Private
const deleteStore = asyncHandler(async (req, res) => {
  const allowedRoles = await helpers.getMongoRoles(accessControl.permissions.stores.delete);
  if (helpers.compareRoles(allowedRoles, req.user.roleId)) {
    const store = await Store.findById(req.params.id);
    if (!store) {
      res.status(400);
      throw new Error("Store not found");
    };
    await store.remove()
    res.status(200).json({ id: req.params.id });
  } else {
    res.status(403).json({'message': 'Forbidden'});
  }
});

module.exports = { getStores, getStore, setStore, updateStore, deleteStore };
