const express = require("express");
const router = express.Router();
const {
  createProject,
  allProject,
  getSingleProject,
} = require("../controllers/projectController");
const validation = require("../helpers/validators/validate");
const projectSchema = require("../helpers/validators/projectSchema");

router.route("/").get(allProject);
router
  .route("/:id")
  .post(validation(projectSchema), createProject)
  .get(getSingleProject);

module.exports = router;
