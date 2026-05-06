const Delivery = require("../models/Delivery");
const axios = require('axios');
// const Order = require("../models/Order");

//const generateDeliveryId = () => {
//    return "DEL-" + Date.now();
//};const Order = require("../models/Order");

// If MongoDB is not available
let memoryOrders = [];

const isMongoConnected = () => {
    const mongoose = require("mongoose");
    return mongoose.connection.readyState === 1;
};

exports.updateDeliveryStatus = async (req, res) => {
    try {
        const { status, estimated_delivery, courier_name, delivery_notes } = req.body;

        const delivery = await Delivery.findOne({
            delivery_id: req.params.delivery_id,
        });

        if (!delivery) {
            return res.status(404).json({ message: "Delivery not found." });
        }

        if (status) delivery.status = status;
        if (estimated_delivery) delivery.estimated_delivery = estimated_delivery;
        if (courier_name) delivery.courier_name = courier_name;
        if (delivery_notes !== undefined) delivery.delivery_notes = delivery_notes;

        await delivery.save();

        const order = await Order.findOne({ order_id: delivery.order_id });

        if (order) {
            if (delivery.status === "In Transit") {
                order.order_status = "In Transit";
            } else if (delivery.status === "Out for Delivery") {
                order.order_status = "In Transit";
            } else if (delivery.status === "Delivered") {
                order.order_status = "Delivered";
            } else if (delivery.status === "Failed Delivery") {
                order.order_status = "Cancelled";
            }

            await order.save();
        }

        res.status(200).json({
            message: "Delivery status updated successfully.",
            delivery,
            order,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};