const { connectToDB } = require("../ConnectionDB/DB");

const getAllProducts = async (req, res) => {
  const db = await connectToDB();
  const collection = db.collection("products"); // collection from db
  try {
    const product = await collection.find().limit(51).toArray();
    if (product.length === 0)
      return res.status(404).json({ error: "Failed to fetch data" });
    res.json(product);
  } catch (error) {
    console.error("API Error:", error);
    res.status(500).json({ error: "Failed to fetch data" });
  }
};

const getProductById = async (req, res) => {
  const db = await connectToDB();
  const collection = db.collection("products"); // collection from db
  try {
    const product = await collection.findOne({ _id: req.params.id });
    if (!product) return res.status(404).json({ error: "Product not found" });
    res.json(product);
  } catch (error) {
    console.error("API Error:", error);
    res.status(500).json({ error: "Failed to fetch product" });
  }
};

const getProductByCategory = async (req, res) => {
  const db = await connectToDB();
  const collection = db.collection("products"); // collection from db
  try {
    const product = await collection
      .find({
        "category.name": req.params.category,
      })
      .toArray();
    if (product.length === 0)
      return res.status(404).json({ error: "Product not found" });
    res.json(product);
  } catch (error) {
    console.error("API Error:", error);
    res.status(500).json({ error: "Failed to fetch product" });
  }
};

const getSearchResult = async (req, res) => {
  const db = await connectToDB();
  const collection = db.collection("products");
  try {
    const search = await collection
      .find({
        title: { $regex: req.body, $options: "i" }, // case-insensitive search
      })
      .toArray();
    if (!search) res.status(404).json({ error: "Product not found" });
    res.json(search);
  } catch (error) {
    console.error("API Error:", error);
    return res.status(500).json({ error: "Failed to fetch product" });
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  getProductByCategory,
  getSearchResult,
};
