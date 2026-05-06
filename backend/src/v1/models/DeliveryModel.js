const mongoose = require("mongoose");

const deliverySchema = new mongoose.Schema({
        deliveryId: {
            type: String,
            required: true,
            unique: true,
        },

        status: {
            type: String,
            enum: ["Pending", "In Transit", "Out for Delivery", "Delivered", "Failed Delivery"],
            default: "Pending",
        },

        estimatedDelivery: {
            type: Date,
            required: true,
        },

        courierName: {
            type: String,
            required: true,
        },

        deliverNotes: {
            type: String,
            default: "",
        }
    },
    { timestamps: true },
);

module.exports = mongoose.model("DeliveryModel", deliverySchema);