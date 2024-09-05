const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');

// Inscription //
router.post('/signup', userCtrl.signup);

// Login //
router.post('/login', userCtrl.login);

module.exports = router;