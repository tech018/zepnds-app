const db = require("../models");
var bcrypt = require("bcrypt");
const generateToken = require("../config/generateToken");

const Users = db.users;
const Activity = db.activity;

const getUser = async (req, res) => {
  try {
    const id = req.params.id;

    const data = await Users.findOne({
      include: [
        {
          model: Activity,
          as: "activity",
        },
      ],
      where: { id: id },
    });

    if (data) {
      res.status(200).json(data);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const registerUser = async (req, res) => {
  try {
    const { email, name, password, avatar, address } = req.body;

    if (!email) return res.status(400).json({ message: "Email is required" });
    if (!validateEmail(email))
      return res.status(400).json({ message: "Invalid emails." });
    if (!password)
      return res.status(400).json({ message: "Password is required" });
    if (!name)
      return res.status(400).json({ message: "Full name is required" });
    if (!avatar)
      return res.status(400).json({ message: "Picture is required" });
    if (!address)
      return res.status(400).json({ message: "Address is required" });

    var salt = bcrypt.genSaltSync(10);
    const passwordHash = await bcrypt.hashSync(password, salt);
    const newUser = {
      email,
      password: passwordHash,
      role: 1,
      name,
      address,
      avatar,
      activated: false,
    };

    const response = await Users.create(newUser);
    if (response) {
      res
        .status(200)
        .json({ message: `Successfully created ${email} account` });
    } else {
      res.status(400).json({ message: "Unable to process your request!" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const loginController = async (req, res) => {
  const { email, password } = req.body;
  if (!email) return res.status(400).json({ message: "Email is required!" });
  if (!email) return res.status(400).json({ message: "Email is required" });
  if (!validateEmail(email))
    return res.status(400).json({ message: "Invalid emails." });
  if (!password)
    return res.status(400).json({ message: "Password is required" });

  Users.findOne({
    where: {
      email: req.body.email,
    },
  })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: "Invalid Password or Email!" });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(403).json({
          accessToken: null,
          message: "Invalid Password or Email!",
        });
      }

      res.status(200).json({
        accessToken: generateToken(user.id, user.email, user.role, user.avatar),
      });
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};

module.exports = {
  getUser,
  registerUser,
  loginController,
};

const validateEmail = (email) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};
