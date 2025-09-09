const express = require('express');
const router = express.Router();
const Auth = require('../controllers/authenticationController');

router.post('/register', Auth.registerUser);
router.post('/login', Auth.loginUser);
router.post('/logout', Auth.handleLogout);
// router.post('/logout', Auth.logout);
// router.post('/verify', Auth.verifyToken);
// router.post('/forgot-password', Auth.forgotPassword);
// router.post('/validation-otp', Auth.validationOtp);
// router.post('/reset-password', Auth.resetPassword);
module.exports = router;