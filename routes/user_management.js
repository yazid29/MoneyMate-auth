const express = require('express');
const router = express.Router();
const User = require('../controllers/accounts');
const { verifyToken } = require("../controllers/authentication");

router.get('/', User.getUsers);
// router.post('/create', User.insertUser);
router.get('/getbyid/:id',verifyToken, User.getUserById);
router.put('/update/', User.updateUserById);
router.delete('/delete-hard/:id', User.deleteUserById);
router.delete('/delete/:id', User.softDeleteUserById);
router.get('/username/:username', User.getUserByUsername);
module.exports = router;