const express = require("express");
const { searchProducts } = require("../controllers/productControllers");


const searchRouter = express.Router();

searchRouter.get("/product",searchProducts);

module.exports = {
  searchRouter,
};
