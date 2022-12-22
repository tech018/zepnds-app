const jwt = require("jsonwebtoken");
const generateToken = (id, email, role, avatar) => {
  return jwt.sign({ id, email, role, avatar }, process.env.JWT_SECRET, {
    expiresIn: Math.floor(Date.now() / 1000) + 10 * 60,
  });
};

module.exports = generateToken;
