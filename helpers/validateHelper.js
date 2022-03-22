const Role = require('../models/roleModel');

const getMongoRoles = (roles) => {
  return Role.find({ name: { $in: roles }}).distinct('_id');
}

const compareRoles = (allowedRoles, givenRole) => {
  let match = false;
  allowedRoles.forEach((role) => {
    if(JSON.stringify(role._id) === JSON.stringify(givenRole._id)) {
      match = true;
      return true;
    }
  });
  return match;
}

module.exports = { compareRoles, getMongoRoles };