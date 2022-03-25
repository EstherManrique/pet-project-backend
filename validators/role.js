const { check } = require("express-validator");
const { validateResult } = require("../helpers/validateHelper");

const validateSave = [
  check("name")
    .exists()
    .not()
    .isEmpty()
    .isString()
    .withMessage('Error role name'),
    (request, response, next) => {
    validateResult(request, response, next);
  },
];

const validateUpdate = [
  check("id")
    .isMongoId()
    .withMessage("Must be a valid MongoID"),
  check("name")
    .optional({
      checkFalsy: false,
    })
    .not()
    .isEmpty()
    .isString(),
  (request, response, next) => {
    validateResult(request, response, next);
  },
];

const validateDelete = [
  check("id")
    .isMongoId()
    .withMessage("Must be a valid MongoID"),
  (request, response, next) => {
    validateResult(request, response, next);
  },
];

module.exports = { validateSave, validateUpdate, validateDelete };
