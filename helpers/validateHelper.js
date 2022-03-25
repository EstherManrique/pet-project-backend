const { validationResult } = require("express-validator");
const Role = require('../models/roleModel');

const validateResult = (request, response, next) => {
  try {
    validationResult(request).throw();
    return next();
  } catch (error) {
    response.status(400);
    response.send({ error: error.array() });
  }
};

// Find roles matching given roles names
const getMongoRoles = (roles) => {
  return Role.find({ name: { $in: roles }}).distinct('_id');
}

// Comparing roles allowed roles per route with the current user role
const compareRoles = (allowedRoles, userRole) => {
  let match = false;
  allowedRoles.forEach((role) => {
    if(JSON.stringify(role._id) === JSON.stringify(userRole._id)) {
      match = true;
      return true;
    }
  });
  return match;
}

module.exports = { compareRoles, getMongoRoles, validateResult };