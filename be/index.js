const express = require("express");
const { connection } = require("./db");
const { userRouter } = require("./routes/userRoutes");
const cors = require("cors");
const { productRouter } = require("./routes/porductRoutes");
require("dotenv").config();
const { auth } = require("./middleware/auth");
const { searchRouter } = require("./routes/searchRouter");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/users",userRouter);
app.use("/search",searchRouter);

//Protected Routes
app.use(auth);

app.use("/product",productRouter)

app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log("connected to DB");
  } catch (err) {
    console.log(err);
    console.log("Cannot connect to the DB");
  }
  console.log(`server is running at ${process.env.port}`);
  
});