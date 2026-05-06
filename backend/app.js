const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

app.use(cors());
app.options('*', cors());

app.get("/", (req, res) => {
  res.send("Delivery Status Update API is running");
});

app.use("/api/orders", require("./routes/OrderRoute"))
app.use("/api/deliveries", require("./routes/DeliveryRoute"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;