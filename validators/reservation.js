const { check } = require("express-validator");
const { validateResult } = require("../helpers/validateHelper");

const validateSave = [
  check("petName")
    .exists()
    .not()
    .isEmpty()
      .withMessage('Pet name should not be empty.')
    .isString()
      .withMessage('Invalid pet name.'),
  check("date")
    .exists()
    .not()
    .isEmpty()
      .withMessage('Date should not be empty.')
    .isISO8601()
      .withMessage('Invalid date selected.'),
  check("status")
    .optional({
      checkFalsy: false
    })
    .not()
    .isEmpty()
      .withMessage('Status should not be empty.')
    .isIn(['pending', 'confirmed', 'canceled'])
      .withMessage('Status not valid.'),
  check("clientPhone")
    .exists()
    .not()
    .isEmpty()
      .withMessage('Phone should not be empty.')
    .isNumeric()
      .withMessage('Phone is not numeric.')
    .isLength({min: 10, max: 10})
      .withMessage('Phone invalid.'),
  check('clientId')
    .isMongoId()
      .withMessage("ClientId must be a valid MongoID"),
  check('storeId')
    .isMongoId()
      .withMessage("StoreId must be a valid MongoID"),
  check('serviceId')
    .isMongoId()
      .withMessage("ServiceId must be a valid MongoID"),
  (request, response, next) => {
    validateResult(request, response, next);
  }  
];

const validateUpdate = [
  check('id')
    .isMongoId()
      .withMessage("Id must be a valid MongoID"),
  check("petName")
    .optional({
      checkFalsy: true
    })
    .not()
    .isEmpty()
      .withMessage('Pet name should not be empty.')
    .isString()
    .withMessage('Invalid pet name.'),
  check("date")
    .optional({
      checkFalsy: true
    })
    .not()
    .isEmpty()
      .withMessage('Date should not be empty.')
    .isISO8601()
      .withMessage('Invalid date selected.'),
  check("status")
    .optional({
      checkFalsy: true
    })
    .not()
    .isEmpty()
      .withMessage('Status should not be empty.')
    .isIn(['pending', 'confirmed', 'canceled'])
      .withMessage('Status not valid.'),
  check("clientPhone")
    .optional({
      checkFalsy: true
    })
    .not()
    .isEmpty()
      .withMessage('Phone should not be empty.')
    .isNumeric()
      .withMessage('Phone is not numeric.')
    .isLength({min: 10, max: 10})
      .withMessage('Phone invalid.'),
  check('clientId')
    .optional({
      checkFalsy: true
    })
    .isMongoId()
      .withMessage("ClientId must be a valid MongoID"),
  check('storeId')
    .optional({
      checkFalsy: true
    })
    .isMongoId(),
  check('serviceId')
    .optional({
      checkFalsy: true
    })
    .isMongoId()
      .withMessage("ServiceId must be a valid MongoID"),
  (request, response, next) => {
    validateResult(request, response, next);
  }  
];

const validateDelete = [
  check('id')
    .isMongoId()
    .withMessage('Id must be a valid MongoID'),
  (request, response, next) => {
    validateResult(request, response, next);
  }
];

const validateListStore = [
  check('id')
    .isMongoId()
    .withMessage('Id must be a valid MongoID'),
  (request, response, next) => {
    validateResult(request, response, next);
  }  
];

module.exports = { validateSave, validateUpdate, validateDelete, validateListStore };