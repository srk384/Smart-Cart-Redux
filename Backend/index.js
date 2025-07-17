const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const productListRoute = require("./Routes/productsListRoute");
const userRoute = require('./Routes/usersRoute')
require("dotenv").config();
const port = 3000;
app.use(cors());
app.use(bodyParser.text());
app.use(bodyParser.json());

//products list route
app.use("/api", productListRoute);

//user route
app.use("/user", userRoute);

app.listen(port, () => console.log(`serever is running at port: ${port}`));