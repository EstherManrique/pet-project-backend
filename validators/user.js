const { check } = require("express-validator");
const { validateResult } = require("../helpers/validateHelper");

const validateSave = [
  check("name")
    .exists()
    .not()
    .isEmpty()
      .withMessage("Name should not be empty.")
    .isString()
      .withMessage("Invalid name."),
  check("userName")
    .exists()
    .not()
    .isEmpty()
      .withMessage("Username should not be empty.")
    .matches(/^([a-zñA-ZÑ\.\_0-9]{5,})$/, 'g')
      .withMessage('Error username structure, allowed characters: a-z, ., _, numbers'),
  check("email")
    .exists()
    .not()
    .isEmpty()
      .withMessage("User email should not be empty.")
    .isString()
      .withMessage("Invalid email.")
    .isEmail()
      .withMessage('Must be a valid email.'),
  check("password")
    .exists()
    .not()
    .isEmpty()
      .withMessage("Password should not be empty.")
    .isStrongPassword()
      .withMessage('Must be a strong password.'),
  check("roles")
    .optional({
      checkFalsy: true
    })
    .isMongoId()
      .withMessage("Role must be a valid MongoID."),
  check('storeId')
    .optional({
      checkFalsy: true
    })
    .isMongoId()
      .withMessage("StoreId must be a valid MongoID."),
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
      checkFalsy: true
    })
    .not()
    .isEmpty()
      .withMessage("Name should not be empty.")
    .isString()
      .withMessage("Invalid name."),
  check("userName")
    .optional({
      checkFalsy: true
    })
    .not()
    .isEmpty()
      .withMessage("Username should not be empty.")
    .matches(/^([a-zñA-ZÑ\.\_0-9]{5,})$/, 'g')
      .withMessage('Error username structure, allowed characters: a-z, ., _, numbers'),
  check("email")
    .optional({
      checkFalsy: true
    })
    .exists()
    .not()
    .isEmpty()
      .withMessage("User email should not be empty.")
    .isString()
      .withMessage("Invalid email.")
    .isEmail()
      .withMessage('Must be a valid email.'),
  check("password")
    .optional({
      checkFalsy: true
    })
    .exists()
    .not()
    .isEmpty()
      .withMessage("Password should not be empty.")
    .isStrongPassword()
      .withMessage('Must be a strong password.'),
  check("roles")
    .optional({
      checkFalsy: true
    })
    .isMongoId()
      .withMessage("Role must be a valid MongoID."),
  check('storeId')
    .optional({
      checkFalsy: true
    })
    .isMongoId()
      .withMessage("StoreId must be a valid MongoID."),
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

const validateLogin = [
  check("email")
    .exists()
    .not()
    .isEmpty()
      .withMessage("User email should not be empty.")
    .isString()
      .withMessage("Invalid email.")
    .isEmail()
      .withMessage('Must be a valid email.'), 
  check("password")
    .exists()
    .not()
    .isEmpty()
      .withMessage("Password should not be empty.")
    .isStrongPassword()
      .withMessage('Must be a strong password.'),
  (request, response, next) => {
    validateResult(request, response, next);
  }  
];

module.exports = { validateSave, validateUpdate, validateDelete, validateLogin };
