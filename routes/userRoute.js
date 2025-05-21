const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/register', authController.registrar);
router.get('/AllUser', authController.getAllUsers);
router.post('/login', authController.login);

module.exports = router;
