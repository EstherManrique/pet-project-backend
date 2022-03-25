const { check } = require("express-validator");
const { validateResult } = require("../helpers/validateHelper");

const validateSave = [
  check("name")
    .exists()
    .not()
    .isEmpty()
    .isString()
    .withMessage('Error name'),
  check("userName")
    .exists()
    .not()
    .isEmpty()
    .matches(/^([a-zñA-ZÑ\_0-9]{5,})$/, 'g')
    .withMessage('Error userName at least 5 characters'),
  check("email")
    .isString()
    .isEmail()
    .withMessage('Must be a valid email'),
  check("password")
    .exists()
    .not()
    .isEmpty()
    .isStrongPassword()
    .withMessage('Must be a strong passwor'),
  check("roles")
    .optional({
      checkFalsy: false
    })
    .isArray(),
  check('storeId')
    .optional({
      checkFalsy: false
    })
    .isMongoId()
    .withMessage("Must be a valid MongoID"),
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
  check("userName")
    .optional({
      checkFalsy: false
    })
    .not()
    .isEmpty()
    .isString()
    .matches(/^([a-zñA-ZÑ\_0-9]{5,})$/, 'g')
    .withMessage('Error manger userName at least 5 characters'),
  check("email")
    .optional({
      checkFalsy: true
    })
    .isString()
    .isEmail(),
  check("password")
    .optional({
      checkFalsy: false
    })
    .exists()
    .not()
    .isEmpty()
    .isStrongPassword()
    .withMessage('Must be a strong password'),
  check("roles")
    .optional({
      checkFalsy: false
    })
    .isArray(),
  check('storeId')
    .optional({
      checkFalsy: false
    })
    .isMongoId()
    .withMessage("Must be a valid MongoID"),
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
