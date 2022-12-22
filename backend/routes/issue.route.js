const express = require("express");
const router = express.Router();

const validation = require("../helpers/validators/validate");
const issueSchema = require("../helpers/validators/issueSchema");
const {
  createIssue,
  deleteIssues,
  getSingleIssue,
  updateIssue,
} = require("../controllers/issueController");

router
  .route("/")
  .post(validation(issueSchema), createIssue)
  .delete(deleteIssues);

router.route("/:id").get(getSingleIssue).put(updateIssue);

module.exports = router;
