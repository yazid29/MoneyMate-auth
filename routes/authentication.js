const express = require('express');
const router = express.Router();
const Auth = require('../controllers/authentication');

// router.post('/login', Auth.loginUser);
// router.post('/logout', Auth.logout);
router.post('/register', Auth.registerUser);
// router.post('/verify', Auth.verifyToken);
// router.post('/forgot-password', Auth.forgotPassword);
// router.post('/validation-otp', Auth.validationOtp);
// router.post('/reset-password', Auth.resetPassword);
module.exports = router;