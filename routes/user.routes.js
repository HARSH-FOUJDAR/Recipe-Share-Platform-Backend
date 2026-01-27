const express = require("express");
const router = express.Router();

const isAdmin = require("../middleware/admin.middleware");
const makeAdmin = require("../controllers/user.controller");
const autonticate = require("../middleware/auth.middleware");

router.put("/make-admin/userId", autonticate, isAdmin, makeAdmin.Admin);

module.exports = router;
