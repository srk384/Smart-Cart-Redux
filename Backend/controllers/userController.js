const { connectToDB } = require("../ConnectionDB/DB");
const bcrypt = require("bcrypt");
const { verifyJWT, generateToken } = require("../Middleware/JwtMiddleware");

const signUp = async (req, res) => {
  const db = await connectToDB();
  const collection = await db.collection("users");
  const { name, email, password } = req.body;

  try {
    const user = await collection.findOne({ email: email });

    if (!user) {
      const encryptedPassword = await bcrypt.hash(password, 10);
      const result = await collection.insertOne({
        name: name,
        email: email,
        password: encryptedPassword,
      });
      const newUser = await collection.findOne({ _id: result.insertedId });
      const token = generateToken(newUser);
      return res.status(201).json({ token: token, user: newUser });
    }

    return res.status(401).json({ error: "User already exist" });
  } catch (error) {
    console.error("API Error:", error);
    res.status(500).json({ error: "Failed to fetch data" });
  }
};

const signIn = async (req, res) => {
  const db = await connectToDB();
  const collection = await db.collection("users");
  const { email, password } = req.body;

  try {
    const user = await collection.findOne({ email: email });

    if (!user) res.status(400).json({ error: "User does not exist" });

    if (user && (await bcrypt.compare(password, user.password))) {
      delete user.password; // preventing password to send to the client
      const token = generateToken(user);
      return res.status(200).json({ token: token, user: user });
    } else {
      return res.status(400).json({ error: "Incorrect Password" });
    }
  } catch (error) {
    console.error("API Error:", error);
    res.status(500).json({ error: "Failed to fetch data" });
  }
};


module.exports = {
  signUp,
  signIn,
};
