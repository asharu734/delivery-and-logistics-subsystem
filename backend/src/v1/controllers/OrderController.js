const Order = require("../models/Order");

const generateOrderId = () => {
    return "ORD-" + Date.now();
};

// POST /api/orders
exports.createOrder = async (req, res) => {
    try {
        const {
            customer_info,
            order_source,
            items,
            total_amount,
            payment_status,
        } = req.body;

        if (
            !customer_info ||
            !items ||
            items.length === 0 ||
            !total_amount
        ) {
            return res.status(400).json({
                message: "Missing required order fields.",
            });
        }

        const order = await Order.create({
            order_id: generateOrderId(),
            customer_info,
            order_source: order_source || "web",
            items,
            total_amount,
            payment_status: payment_status || "Pending",
            order_status: "Processing",
        });

        res.status(201).json({
            message: "Order created successfully.",
            order,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

// GET /api/orders
exports.getOrders = async (req, res) => {
    try {
        const orders = await Order.find().sort({
            createdAt: -1,
        });

        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

// GET /api/orders/:order_id
exports.getOrderById = async (req, res) => {
    try {
        const order = await Order.findOne({
            order_id: req.params.order_id,
        });

        if (!order) {
            return res.status(404).json({
                message: "Order not found.",
            });
        }

        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

// GET /api/orders/track?order_id=ORD-123
exports.trackOrder = async (req, res) => {
    try {
        const order = await Order.findOne({
            order_id: req.query.order_id,
        });

        if (!order) {
            return res.status(404).json({
                message: "Order not found.",
            });
        }

        res.status(200).json({
            order_id: order.order_id,
            payment_status: order.payment_status,
            order_status: order.order_status,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

// GET /api/orders/customer/:contact_number
exports.getOrdersByCustomer = async (req, res) => {
    try {
        const orders = await Order.find({
            "customer_info.contact_number":
                req.params.contact_number,
        });

        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

// PUT /api/orders/:order_id/status
exports.updateOrderStatus = async (req, res) => {
    try {
        const { order_status, payment_status } = req.body;

        const order = await Order.findOne({
            order_id: req.params.order_id,
        });

        if (!order) {
            return res.status(404).json({
                message: "Order not found.",
            });
        }

        if (order_status) {
            order.order_status = order_status;
        }

        if (payment_status) {
            order.payment_status = payment_status;
        }

        await order.save();

        res.status(200).json({
            message: "Order updated successfully.",
            order,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

// DELETE /api/orders/:order_id
exports.cancelOrder = async (req, res) => {
    try {
        const order = await Order.findOneAndDelete({
            order_id: req.params.order_id,
        });

        if (!order) {
            return res.status(404).json({
                message: "Order not found.",
            });
        }

        res.status(200).json({
            message: "Order cancelled successfully.",
            order,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};