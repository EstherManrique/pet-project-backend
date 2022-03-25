const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');
const { validateSave, validateUpdate, validateDelete, validateLogin } = require('../validators/user')

router.get('/', protect, userController.getUsers);
router.get('/:id', protect, userController.getUser);
router.post('/', validateSave, protect, userController.createUser);
router.put('/:id', validateUpdate, protect, userController.updateUser);
router.delete('/:id', validateDelete, protect, userController.deleteUser);

// Auth paths
router.post('/register', validateSave, userController.registerUser);
router.post('/login', validateLogin, userController.loginUser);

module.exports = router;