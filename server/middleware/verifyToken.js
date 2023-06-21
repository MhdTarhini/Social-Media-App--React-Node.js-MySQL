const jwt = require("jsonwebtoken");
const url = require("url");

const verifyToken = (req, res, next) => {
  const currentUrl = url.parse(req.url, true); // Parse the current URL
  if (
    currentUrl.pathname === "/api/auth/login" ||
    currentUrl.pathname === "/api/auth/register"
  ) {
    return next(); // Skip middleware if user is on login or register page
  }
  const token = req.cookies.access_token;
  if (!token) {
    return res.status(401).json("Not authenticated");
  }
  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid");
    next();
  });
};

module.exports = verifyToken;
