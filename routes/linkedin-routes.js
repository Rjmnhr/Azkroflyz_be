const express = require("express");
const LinkedinController = require("../controller/linkedin-controller");

const router = express.Router();

router.post("/data", LinkedinController.getData);

module.exports = router;
