const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;

const createAccessToken = (payload) => {
  return jwt.sign(payload, JWT_SECRET);
}

module.exports = {
  createAccessToken,
}