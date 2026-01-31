const express = require("express");
const router = express.Router();
const FavrouitsControllesrs = require("../controllers/Favrouits.controller");
const autonticate = require("../middleware/auth.middleware");

router.post("/favrouits", autonticate, FavrouitsControllesrs.toggleFavrouits);
router.get("/", autonticate, FavrouitsControllesrs.getFavrouits);
router.delete("/:id", autonticate, FavrouitsControllesrs.DeleteFav);


module.exports = router;