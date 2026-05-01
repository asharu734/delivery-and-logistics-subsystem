const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
    orderId: { type: String, required: true, unique: true },
    customerName: { type: String, required: true },
    
    items: [{
        productId: String,
        quantity: Number,
        isAvailable: { type: Boolean, default: true }
    }],

    origin: {
        supplierName: String,
        address: String,
        lat: { type: Number, required: true },
        long: { type: Number, required: true }
    },

    destination: {
        address: String,
        lat: { type: Number, required: true },
        long: { type: Number, required: true }
    },

    status: { 
        type: String, 
        enum: ["Pending", "In Transit", "Delivered"], 
        default: "Pending" 
    }
}, { timestamps: true });

module.exports = mongoose.model("Order", OrderSchema);