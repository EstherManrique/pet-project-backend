const { check } = require("express-validator");
const { validateResult } = require("../helpers/validateHelper");

const validateSave = [
  check("name")
    .exists()
    .not()
    .isEmpty()
    .isString()
    .withMessage('Error store name'),
  check("address")
    .exists()
    .not()
    .isEmpty()
    .isString()
    .withMessage('Error store address'),
  check("email")
    .exists()
    .not()
    .isEmpty()
    .isString()
    .isEmail()
    .withMessage('Must be a valid email'),
  check("phone")
    .exists()
    .not()
    .isEmpty()
    .isNumeric()
    .isLength({min: 10, max: 10})
    .withMessage('Error strore phone, must be ten digits'),
  check("location")
    .exists()
    .not()
    .isEmpty()
    .isString()
    .isLatLong()
    .withMessage('Error store location'),
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
  check("address")
    .optional({
      checkFalsy: false,
    })
    .not()
    .isEmpty()
    .isString(),
  check("email")
    .optional({
      checkFalsy: false,
    })
    .not()
    .isEmpty()
    .isEmail(),
  check("phone")
    .optional({
      checkFalsy: false,
    })
    .not()
    .isEmpty()
    .isNumeric(),
  check("location")
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
