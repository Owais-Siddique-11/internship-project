const express = require('express');
const router = express.Router();

const UserController = require('../../controllers/user-controller');

// Route: /api/v1/signup
router.post('/signup', UserController.signup);

// Route: /api/v1/login
router.post('/login', UserController.login);

module.exports = router;
