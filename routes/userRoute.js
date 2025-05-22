const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/newUser', authController.registrar);
router.get('/AllUsers', authController.getAllUsers);
router.post('/login', authController.login);

module.exports = router;
