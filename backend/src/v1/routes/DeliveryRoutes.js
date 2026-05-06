const express = require("express");
const router = express.Router();

const {
    updateDeliveryStatus,
} = require("../controllers/DeliveryController");

router.put("/:delivery_id", updateDeliveryStatus);

module.exports = router;