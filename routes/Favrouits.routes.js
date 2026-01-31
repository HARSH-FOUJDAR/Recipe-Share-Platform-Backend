const express = require("express");
const router = express.Router();
const FavrouitsControllesrs = require("../controllers/Favrouits.controller");
const autonticate = require("../middleware/auth.middleware");

router.post("/favrouits", autonticate, FavrouitsControllesrs.toggleFavrouits);
router.get("/", autonticate, FavrouitsControllesrs.getFavrouits);
