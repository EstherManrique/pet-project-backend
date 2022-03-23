const asyncHandler = require("express-async-handler");
const Role = require("../models/roleModel");
const helpers = require("../helpers/validateHelper");
const accessControl = require('../helpers/accessControl');

// @desc    Get roles list
// @route   GET /api/roles
// @access  Private
const getRoles = asyncHandler(async (req, res) => {
  const allowedRoles = await helpers.getMongoRoles(accessControl.permissions.role.get);
  if (helpers.compareRoles(allowedRoles, req.user.roleId)) {
    const roles = await Role.find({});
    res.status(200).json({ message: "Get Roles", roles });
  } else {
    res.status(403).json({'message': 'Forbidden'});
  }
});

// @desc    Set role
// @route   POST /api/roles
// @access  Private
const setRole = asyncHandler(async (req, res) => {
  const allowedRoles = await helpers.getMongoRoles(accessControl.permissions.role.post);
  if (helpers.compareRoles(allowedRoles, req.user.roleId)) {
    const { name } = req.body;
    const newRole = Role({
      name
    });
    await newRole.save();
    res.status(200).json(newRole);
  } else {
    res.status(403).json({'message': 'Forbidden'});
  }
});

// @desc    Update role
// @route   PUT /api/roles/:id
// @access  Private
const updateRole = asyncHandler(async (req, res) => {
  const allowedRoles = await helpers.getMongoRoles(accessControl.permissions.role.put);
  if (helpers.compareRoles(allowedRoles, req.user.roleId)) {
    const updateRoleId = req.params.id;
    const params = req.body;
    const role = await Role.findById(updateRoleId, params);
    if (!role) {
      res.status(400);
      throw new Error("Role not found");
    };
    const updatedRole = await Role.findByIdAndUpdate(updateRoleId, params, {
      new: true,
    });
    res.status(200).json(updatedRole);
  } else {
    res.status(403).json({'message': 'Forbidden'});
  }
});

// @desc    Delete role
// @route   DELETE /api/roles/:id
// @access  Private
const deleteRole = asyncHandler(async (req, res) => {
  const allowedRoles = await helpers.getMongoRoles(accessControl.permissions.role.delete);
  if (helpers.compareRoles(allowedRoles, req.user.roleId)) {
    const role = await Role.findById(req.params.id);
    if (!role) {
      res.status(400);
      throw new Error("Role not found");
    };
    await role.remove()
    res.status(200).json({ id: req.params.id });
  } else {
    res.status(403).json({'message': 'Forbidden'});
  }
});

module.exports = { getRoles, setRole, updateRole, deleteRole };
