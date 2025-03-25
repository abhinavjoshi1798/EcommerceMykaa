const express = require("express");
const { ProductRegistered, getProducts, searchProducts, getSingleProduct, AddToCart, GetCartData, DeleteCartItem, getProductsWithoutQueryParams, editProductDetails, deleteProduct } = require("../controllers/productControllers");

const productRouter = express.Router();

productRouter.post("/create_product",ProductRegistered);
productRouter.get("/getproducts",getProducts);
// productRouter.get("/searchproduct",searchProducts);
productRouter.get("/getproducts/:productId",getSingleProduct);
productRouter.post("/addtocart/",AddToCart);
productRouter.get("/usercartdata/",GetCartData)
productRouter.get("/deleteusercartitem/:id",DeleteCartItem)
productRouter.get("/getallproducts",getProductsWithoutQueryParams)
productRouter.post("/editproduct/:id",editProductDetails)
productRouter.get("/deleteproduct/:productId",deleteProduct)


module.exports = {
  productRouter,
};