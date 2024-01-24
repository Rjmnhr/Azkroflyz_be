const express = require("express");
const LinkedinController = require("../controller/linkedin-controller");

const router = express.Router();

router.post("/data", LinkedinController.getData);
router.post(
  "/education-desired-output",
  LinkedinController.educationalAndDesired
);
router.post("/education-output", LinkedinController.educationalOutput);
router.post("/desired-title-count", LinkedinController.getDesiredTitleCount);
router.post("/ug-based-colleges", LinkedinController.getCollegeBasedOnUG);
router.get("/college-tier", LinkedinController.getCollegeTier);
router.get("/company-size", LinkedinController.getCompanySize);
router.get("/company-sector", LinkedinController.getCompanySector);
router.get("/titles", LinkedinController.getTitles);

module.exports = router;
