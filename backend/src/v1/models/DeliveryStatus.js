const mongoose = require('mongoose');

const deliveryStatusSchema = new mongoose.Schema(
    {
        order_id: {
            type: String,
            required: true,
            unique: true,
        },

        status: {
            type: String,
            required: true,
            default: "Pending",
        },

        tracking_number: {
            type: String,
            default: "",
        },

        estimated_arrival: {
            type: Date,
        },

        updated_by: {
            type: String,
            default: "Logistics Subsystem",
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("DeliveryStatus", deliveryStatusSchema);