const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');

const connectToMongoDB = require('./config/mongodb');

dotenv.config();
connectToMongoDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  // CHANGE THIS SHIT LATER
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.get("/", (req, res) => {
  res.send("Delivery Status Update API is running");
});

//app.use("/api/orders", require("./src/v1/routes/OrderRoute"))
app.use("/api/deliveries", require("./src/v1/routes/DeliveryRoute"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;