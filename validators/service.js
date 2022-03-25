const { check } = require("express-validator");
const { validateResult } = require("../helpers/validateHelper");

const validateSave = [
  check("name")
    .exists()
    .not()
    .isEmpty()
    .isString()
    .withMessage('Error service name'),
  check("description")
    .exists()
    .not()
    .isEmpty()
    .isString()
    .withMessage('Error service description'),
  check("price")
    .exists()
    .not()
    .isEmpty()
    .withMessage('Should not be empty')
    .isCurrency()
    .withMessage('Must be a valid Currency'),
  (request, response, next) => {
    validateResult(request, response, next);
  }  
];

const validateUpdate = [
  check('id')
    .isMongoId()
    .withMessage("Must be a valid MongoID"),
  check("name")
    .optional({
      checkFalsy: false
    })
    .not()
    .isEmpty()
    .isString(),
  check("description")
    .optional({
      checkFalsy: false
    })
    .not()
    .isEmpty()
    .isString(),
  check("price")
    .optional({
      checkFalsy: false
    })
    .not()
    .isEmpty()
    .isCurrency()
    .withMessage('Must be a valid Currency'),
  (request, response, next) => {
    validateResult(request, response, next);
  }  
];

const validateDelete = [
  check('id')
    .isMongoId()
    .withMessage('Must be a valid MongoID'),
  (request, response, next) => {
    validateResult(request, response, next);
  }  
];




module.exports = { validateSave, validateUpdate, validateDelete };
