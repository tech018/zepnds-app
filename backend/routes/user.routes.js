const express = require("express");
const router = express.Router();
const {
  getUser,
  loginController,
  registerUser,
} = require("../controllers/userControllers");

router.route("/:id").get(getUser);
router.route("/").post(loginController);
router.route("/registerUser").post(registerUser);

module.exports = router;
