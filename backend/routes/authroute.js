const express = require("express");
const cors = require("cors");
const router = express.Router();
const db = require("../config/db.js");
const { hashThePassword } = require("../middleware/auth.js");
const {
	signup,
	signin,
	checkUser,
} = require("../controllers/authcontroller.js");
router.post("/api/auth/signin", signin);
router.post("/api/auth/signup", hashThePassword, signup);
router.post("/api/auth/checkuser", checkUser);
module.exports = router;
