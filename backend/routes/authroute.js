const express = require("express");
const cors = require("cors");
const router = express.Router();
const db = require("../config/db.js");
const { hashThePassword } = require("../middleware/auth.js");
const { signup, signin } = require("../controllers/authcontroller.js");
router.post("/api/auth/signin", signin);
router.post("/api/auth/signup", hashThePassword, signup);
module.exports = router;
