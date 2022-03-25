const { check } = require("express-validator");
const { validateResult } = require("../helpers/validateHelper");

const validateSave = [
  check("name")
    .exists()
    .not()
    .isEmpty()
      .withMessage("Service name should not be empty.")
    .isString()
      .withMessage("Invalid service name."),
  check("description")
    .exists()
    .not()
    .isEmpty()
      .withMessage("Description name should not be empty.")
    .isString()
      .withMessage("Invalid service description."),
  check("price")
    .exists()
    .not()
    .isEmpty()
      .withMessage('Price should not be empty.')
    .isCurrency()
      .withMessage('Price must be a valid currency.'),
  (request, response, next) => {
    validateResult(request, response, next);
  }  
];

const validateUpdate = [
  check('id')
    .isMongoId()
    .withMessage("Id must be a valid MongoID."),
  check("name")
    .optional({
      checkFalsy: false
    })
    .not()
    .isEmpty()
      .withMessage("Service name should not be empty.")
    .isString()
      .withMessage("Invalid service name."),
  check("description")
    .optional({
      checkFalsy: false
    })
    .not()
    .isEmpty()
      .withMessage("Description name should not be empty.")
    .isString()
      .withMessage("Invalid service description."),
  check("price")
    .optional({
      checkFalsy: false
    })
    .not()
    .isEmpty()
      .withMessage('Price should not be empty.')
    .isCurrency()
      .withMessage('Price must be a valid currency.'),
  (request, response, next) => {
    validateResult(request, response, next);
  }  
];

const validateDelete = [
  check('id')
    .isMongoId()
    .withMessage('Id must be a valid MongoID.'),
  (request, response, next) => {
    validateResult(request, response, next);
  }  
];

module.exports = { validateSave, validateUpdate, validateDelete };