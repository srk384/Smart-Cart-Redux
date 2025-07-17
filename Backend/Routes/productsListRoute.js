const express = require("express");
const router = express.Router();
const { getAllProducts, getProductById, getProductByCategory, getSearchResult } = require('../controllers/getProductsController')

router.get("/data", getAllProducts);
router.get("/data/:id", getProductById);
router.get("/category/:category", getProductByCategory);
router.post("/search", getSearchResult);

module.exports = router;