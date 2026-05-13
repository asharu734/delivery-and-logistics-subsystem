const express = require("express");
const router = express.Router();

const {
    createDelivery,
    getDeliveries,
    getDeliveryById,
    getDeliveryByOrderId,
    updateDeliveryStatus,
    deleteDelivery,
    syncStatusWithSupplier,
    pullFromCustomerOrders,
} = require("../controllers/DeliveryController");

router.post("/", createDelivery);
router.get("/", getDeliveries);
router.get("/order/:order_id", getDeliveryByOrderId);
router.get("/:delivery_id", getDeliveryById);
router.put("/:delivery_id", updateDeliveryStatus);
router.delete("/:delivery_id", deleteDelivery);
router.put("/sync/:order_id", syncStatusWithSupplier);
router.post("/sync-all", pullFromCustomerOrders);

module.exports = router;