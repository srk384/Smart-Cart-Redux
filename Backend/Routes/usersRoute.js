const express = require("express");
const router = express.Router();
const {
  signUp,
  signIn,
} = require("../controllers/userController");
const { verifyJWT } = require("../Middleware/JwtMiddleware");

router.post("/signUp", signUp);
router.post("/signin", signIn);
router.get("/verify", verifyJWT, (req, res) => {
  res.status(200).json(req.user);
});

module.exports = router;

