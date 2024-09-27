const express = require('express');
const userController = require('../controllers/userController');
const { authenticate } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', userController.register);
router.get('/profile', authenticate, userController.getProfile);
router.get('/profile/:id', authenticate, userController.getProfileById);
router.put('/profile/:id', authenticate, userController.updateProfile);
router.delete('/delete/:id', authenticate, userController.deleteAccount);
router.put('/change-password/:id', authenticate, userController.changePassword);

module.exports = router;