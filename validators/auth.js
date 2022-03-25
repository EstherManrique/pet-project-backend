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

const validateLogin = [
  check("email")
    .exists()
    .not()
    .isEmpty()
    .isEmail()
    .withMessage('Error manger userName at least 5 characters'), 
  check("password")
    .exists()
    .not()
    .isEmpty()
    .isStrongPassword()
    .withMessage('Must be a strong passwor'),
    (request, response, next) => {
    validateResult(request, response, next);
  }  
];

module.exports = { validateSave, validateLogin };
