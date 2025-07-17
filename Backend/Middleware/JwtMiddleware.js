const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyJWT = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Bearer <token>

  if (!token) {
    return res.status(403).json({ error: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // You now have access to user's data in future routes
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid or expired token." });
  }
};

const generateToken = (user) => {
  return jwt.sign(
    { _id: user._id, email: user.email, name:user.name },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
};

module.exports = { verifyJWT, generateToken };
