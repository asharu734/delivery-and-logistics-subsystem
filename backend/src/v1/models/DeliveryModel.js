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
    },
    { timestamps: true },
);

module.exports = mongoose.model("DeliveryModel", deliverySchema);