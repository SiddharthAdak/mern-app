const express = require('express');
const router = express.Router();
const {loginUser, signupUser, checkUser, logoutUser} = require('../controllers/userController');
// login route
router.post("/login", loginUser);
router.get("/check", checkUser);
//signup route
router.post("/signup", signupUser);
router.get("/logout", logoutUser);

module.exports = router;