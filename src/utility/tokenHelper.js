const jwt = require("jsonwebtoken");

exports.EncodeToken = (email, id) => {
  return jwt.sign({ email, id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

exports.decodeToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return null;
  }
};
