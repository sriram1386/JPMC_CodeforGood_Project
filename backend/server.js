const mongoose = require("mongoose");
const express = require("express");
const app = express();

const dotenv = require("dotenv");
dotenv.config();
const cors = require('cors');
app.use(cors({
  origin: 'http://localhost:8080', // allow your frontend
  credentials: true
}));
//connect mongodb 
console.log("MONGODB_URI from .env is: ", process.env.MONGODB_URI);

mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("DB Connection Successfull")
        //assign port
        app.listen(process.env.PORT || 5000, () => {
            console.log("Backend server is running!");
        });
    })
    .catch((err) => {
        console.log(err);
    });

//routes
const authRoutes = require("./routes/authRoutes");
app.use("/api", authRoutes);

const vendorRoutes = require("./routes/vendorRoutes");
app.use("/api", vendorRoutes);

const machineRoutes = require("./routes/machineRoutes");
app.use("/api", machineRoutes);

const villageRoutes = require("./routes/villageRoutes");
app.use("/api", villageRoutes);

const problemRoutes = require("./routes/problemRoutes");
app.use("/api", problemRoutes);

const adminRoutes = require("./routes/adminRoutes");
app.use("/api", adminRoutes);

// const vleRoutes = require("./routes/vleRoutes");
// app.use("/api", vleRoutes);