const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bookRoutes = require("../routes/bookRoutes");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));
app.use("/api", bookRoutes);
let url =
  "mongodb+srv://nozilaxudoyberdiyeva:BHxlJ5mVJgUetRDp@cluster0.e46r8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose
  .connect(url)
  .then(() => {
    console.log("MongoDBga ulandi");
    app.listen(3001, () => console.log("Server 3000-portda"));
  })
  .catch((err) => console.error("MongoDB xatosi", err));
