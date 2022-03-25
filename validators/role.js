const { check } = require("express-validator");
const { validateResult } = require("../helpers/validateHelper");

const validateSave = [
  check("name")
    .exists()
    .not()
    .isEmpty()
      .withMessage("Role name should not be empty.")
    .isString()
      .withMessage("Invalid role name."),
    (request, response, next) => {
    validateResult(request, response, next);
  },
];

const validateUpdate = [
  check("id")
    .isMongoId()
    .withMessage("Id must be a valid MongoID."),
  check("name")
    .optional({
      checkFalsy: false,
    })
    .not()
    .isEmpty()
      .withMessage("Role name should not be empty.")
    .isString()
      .withMessage("Invalid role name."),
  (request, response, next) => {
    validateResult(request, response, next);
  },
];

const validateDelete = [
  check("id")
    .isMongoId()
    .withMessage("Id must be a valid MongoID."),
  (request, response, next) => {
    validateResult(request, response, next);
  },
];

module.exports = { validateSave, validateUpdate, validateDelete };
