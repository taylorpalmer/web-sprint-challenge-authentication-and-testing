const jwt = require("jsonwebtoken");
const secret = require("../../config/secrets");

function generateToken(user) {
  const payload = {
    username: user.username,
    id: user.id,
  };

  const options = {
    expiresIn: "1h",
  };

  return jwt.sign(payload, process.env.JWT_SECRET || secret.jwtSecret, options);
}

module.exports = generateToken;
