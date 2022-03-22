const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', protect, userController.getUsers);
router.get('/:id', protect, userController.getUser);
router.post('/', protect, userController.createUser);
router.put('/:id', protect, userController.updateUser);
router.delete('/:id', protect, userController.deleteUser);

// Auth paths
router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);

module.exports = router;