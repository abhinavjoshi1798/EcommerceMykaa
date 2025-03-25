const { CartItemModel } = require("../model/CartItem.model");
const { ProductModel } = require("../model/Product.model");
const { dateConstructor, formatDate } = require("./dateController");

const ProductRegistered = async (req, res) => {
  try {
    // Destructure the product object from req.body
    const { product } = req.body;

    const timestamp = dateConstructor();
    const formattedDate = formatDate(timestamp);

    // Modify the product object before creating a new instance
    const modifiedProduct = {
      ...product,
      isDeleted: false,
      new: false,
      dateCreated: formattedDate,
    };

    // Create a new product instance using the modified product object
    const newProduct = new ProductModel(modifiedProduct);

    // Save the new product to the database
    const savedProduct = await newProduct.save();

    // Send a success response with the saved product data
    res.status(201).send(savedProduct);
  } catch (err) {
    res.status(500).send({ err: err.message });
  }
};

const getProducts = async (req, res) => {
  const page = parseInt(req.query._page) || 1;
  const limit = parseInt(req.query._limit) || 9;
  const _sort = req.query._sort || "price";
  const _order = req.query._order === "desc" ? -1 : 1;
  const brandNames = req.query.brand_name
    ? req.query.brand_name.split(",")
    : [];
  const categoryValues = req.query.category_values
    ? req.query.category_values.split(",")
    : [];

  // Build the filter object based on the brand_name and category_values
  let filter = { isDeleted: false }; // Add condition for isDeleted field
  if (brandNames.length) {
    filter["brand_name"] = { $in: brandNames };
  }
  if (categoryValues.length) {
    filter["category_values"] = {
      $regex: categoryValues.join("|"),
      $options: "i",
    };
  }

  try {
    // Count total number of products that match the filter criteria
    const totalProducts = await ProductModel.countDocuments(filter);

    // Calculate skip value based on page and limit
    const skip = (page - 1) * limit;

    // Fetch products from the database with pagination, filtering, and sorting
    const products = await ProductModel.find(filter)
      .sort({ [_sort]: _order })
      .skip(skip)
      .limit(limit);

    // Send the products and total products as a response
    res.status(200).json({ data: products, total: totalProducts, page, limit });
  } catch (err) {
    // If an error occurs, send a 500 status response with the error message
    res.status(500).send({ error: err.message });
  }
};

const getSingleProduct = async (req, res) => {
  const { productId } = req.params;
  try {
    if (!productId) {
      return res.status(400).send({ err: "product id is required in params" });
    }
    const product = await ProductModel.findOne({ id: productId });

    if (!product) {
      return res
        .status(400)
        .send({ msg: "no product found in db for given id" });
    }

    return res.status(200).send({ product: product });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

const searchProducts = async (req, res) => {
  try {
    // Extract the search query from the request parameters
    const { searchQuery } = req.query;

    // Check if the search query is provided
    if (!searchQuery) {
      return res.status(400).json({ error: "Search query is required" });
    }

    // Define a regular expression for case-insensitive search
    const regex = new RegExp(searchQuery, "i");

    // Perform aggregation to search for matching products
    const matchingProducts = await ProductModel.aggregate([
      {
        $match: {
          $or: [
            { name: { $regex: regex } }, // Search by product name
            { category_values: { $regex: regex } }, // Search by category values
            { sku: { $regex: regex } }, // Search by SKU
            { brand_name: { $regex: regex } }, // Search by brand name
            { meta_keywords: { $regex: regex } }, // Search by meta keywords
            // Add more fields to search as needed
          ],
        },
      },
      // Add more aggregation stages if required for sorting, limiting results, etc.
    ]);

    // Send the matching products as a response
    res.status(200).json({ data: matchingProducts });
  } catch (error) {
    console.error("Error searching products:", error);
    // Send an error response if something goes wrong
    res.status(500).json({ error: "Internal server error" });
  }
};

const AddToCart = async (req, res) => {
  try {
    const { product } = req.body;

    // Ensure that buyerId is present in the product object
    if (!product || !product.buyerId) {
      return res
        .status(400)
        .send({ error: "product and buyerId are required" });
    }

    const timestamp = dateConstructor();
    const formattedDate = formatDate(timestamp);

    // Remove the _id property from the product object
    const { _id, ...modifiedProduct } = product;

    // Add additional properties to the modified product
    const finalProduct = {
      ...modifiedProduct,
      isDeleted: false,
      new: false,
      dateCreated: formattedDate,
    };

    const newProduct = new CartItemModel(finalProduct);

    const savedProduct = await newProduct.save();

    res
      .status(201)
      .send({ msg: "Product Added to Cart Successfully", savedProduct });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

const GetCartData = async (req, res) => {
  const { loggedInUserId } = req.body;
  try {
    if (!loggedInUserId) {
      return res.status(401).send({ msg: "userId is required." });
    }
    const cartData = await CartItemModel.find({
      buyerId: loggedInUserId,
      isDeleted: false,
    });
    if (!cartData) {
      return res.status(201).send({ msg: "There are no products in the Cart" });
    }
    res.status(200).send({ data: cartData });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

const DeleteCartItem = async (req, res) => {
  const { id } = req.params;
  try {
    if (!id) {
      return res
        .status(400)
        .send({
          msg: "id of the product item which needs to be removed from the cart is missing",
        });
    }

    const timestamp = dateConstructor();
    const formattedDate = formatDate(timestamp);

    const updatedCartItem = await CartItemModel.findByIdAndUpdate(
      id,
      {
        isDeleted: true,
        dateCreated: formattedDate,
        new: true,
      },
      { new: true }
    );

    if (!updatedCartItem) {
      return res.status(404).send({ error: "Cart item not found" });
    }

    res.status(200).send(updatedCartItem);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

const getProductsWithoutQueryParams = async (req, res) => {
  try {
    const products = await ProductModel.find({ isDeleted: false });
    if (!products) {
      return res.status(400).send({ msg: "No Products available in db." });
    }
    res.status(200).send({ products });
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: err.message });
  }
};

const editProductDetails = async (req, res) => {
  const { id } = req.params;
  const { product } = req.body;

  // console.log("consoling product",req.body.product);

  // Validate input: Check if id and product are present
  if (!id || !product) {
    return res
      .status(400)
      .send({ msg: "Product Id or Product Details are missing in request" });
  }

  // Check if product is an object and not empty
  if (typeof product !== "object" || Object.keys(product).length === 0) {
    return res
      .status(400)
      .send({ msg: "Product details are empty or not properly formatted" });
  }

  try {
    const timestamp = dateConstructor();
    const formattedDate = formatDate(timestamp);

    const updatedProduct = await ProductModel.findOneAndUpdate(
      { id: id },
      { ...product, new: true, dateCreated: formattedDate },
      { new: true, runValidators: true }
    );
    if (!updatedProduct) {
      return res
        .status(404)
        .send({ msg: "No product found with the provided ID" });
    }
    res.status(200).send({ updatedProduct });
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: err.message });
  }
};

const deleteProduct = async (req, res) => {
  const { productId } = req.params;
  try {
    if (!productId) {
      return res.status(400).send({ msg: "ProductIs is required in params." });
    }
    const timestamp = dateConstructor();
    const formattedDate = formatDate(timestamp);

    const deletedProduct = await ProductModel.findOneAndUpdate(
      { _id: productId },
      { isDeleted: true, dateCreated: formattedDate, new: true },
      {
        new: true,
        runValidators: true,
      }
    );
    if (!deletedProduct) {
      return res
        .status(400)
        .send({ msg: "Items with the given is not present in db."});
    }
    res.status(200).send({deletedProduct,
    status:200});
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: err.message });
  }
};
module.exports = {
  ProductRegistered,
  getProducts,
  searchProducts,
  getSingleProduct,
  AddToCart,
  GetCartData,
  DeleteCartItem,
  getProductsWithoutQueryParams,
  editProductDetails,
  deleteProduct,
};
