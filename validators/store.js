const { check } = require("express-validator");
const { validateResult } = require("../helpers/validateHelper");

const validateSave = [
  check("name")
    .exists()
    .not()
    .isEmpty()
      .withMessage("Store name should not be empty.")
    .isString()
      .withMessage("Invalid store name."),
  check("address")
    .exists()
    .not()
    .isEmpty()
      .withMessage("Store address should not be empty.")
    .isString()
      .withMessage("Invalid store address."),
  check("email")
    .exists()
    .not()
    .isEmpty()
      .withMessage("Store email should not be empty.")
    .isString()
      .withMessage("Invalid store email.")
    .isEmail()
      .withMessage('Must be a valid email.'),
  check("phone")
    .exists()
    .not()
    .isEmpty()
      .withMessage("Store phone should not be empty.")
    .isNumeric()
      .withMessage("Invalid store phone number.")
    .isLength({min: 10, max: 10})
      .withMessage('Phone invalid.'),
  check("location")
    .exists()
    .not()
    .isEmpty()
      .withMessage("Store location should not be empty.")
    .isString()
      .withMessage("Invalid store latitude/logitude.")
    .isLatLong()
      .withMessage("Invalid store latitude/logitude."),
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
      .withMessage("Store name should not be empty.")
    .isString()
      .withMessage("Invalid store name."),
  check("address")
    .optional({
      checkFalsy: false,
    })
    .not()
    .isEmpty()
      .withMessage("Store address should not be empty.")
    .isString()
      .withMessage("Invalid store address."),
  check("email")
    .optional({
      checkFalsy: false,
    })
    .not()
    .isEmpty()
      .withMessage("Store email should not be empty.")
    .isString()
      .withMessage("Invalid store email.")
    .isEmail()
      .withMessage('Must be a valid email.'),
  check("phone")
    .optional({
      checkFalsy: false,
    })
    .not()
    .isEmpty()
      .withMessage("Store phone should not be empty.")
    .isNumeric()
      .withMessage("Invalid store phone number.")
    .isLength({min: 10, max: 10})
      .withMessage('Phone invalid.'),
  check("location")
    .optional({
      checkFalsy: false,
    })
    .not()
    .isEmpty()
      .withMessage("Store location should not be empty.")
    .isString()
      .withMessage("Invalid store latitude/logitude.")
    .isLatLong()
      .withMessage("Invalid store latitude/logitude."),
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
