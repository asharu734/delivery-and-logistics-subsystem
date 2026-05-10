import React, { useEffect, useState } from "react";
import API from "../services/api";

function Order() {
    const [deliveries, setDeliveries] = useState([]);
    const [loading, setLoading] = useState(true);

    // FETCH DELIVERIES
    useEffect(() => {
        fetchDeliveries();
    }, []);

    const fetchDeliveries = async () => {
        try {
            const res = await API.get("/deliveries");
            setDeliveries(res.data);
        } catch (err) {
            console.error("Error fetching deliveries:", err);
        } finally {
            setLoading(false);
        }
    };

    // UPDATE STATUS
    const updateStatus = async (id, status) => {
        try {
            await API.put(`/deliveries/${id}`, { status });

            // update UI instantly (no refresh needed)
            setDeliveries((prev) =>
                prev.map((d) =>
                    d._id === id ? { ...d, status } : d
                )
            );
        } catch (err) {
            console.error("Update failed:", err);
            alert("Failed to update status");
        }
    };

    if (loading) {
        return <h3>Loading deliveries...</h3>;
    }

    return (
        <div>
            <h2>Orders / Deliveries</h2>

            <table style={styles.table}>
                <thead>
                    <tr>
                        <th>Order ID</th>
                        <th>Tracking Number</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>
                    {deliveries.map((d) => (
                        <tr key={d._id}>
                            <td>{d.orderId}</td>
                            <td>{d.trackingNumber}</td>
                            <td>
                                <span style={styles.badge}>
                                    {d.status}
                                </span>
                            </td>
                            <td>
                                <select
                                    value={d.status}
                                    onChange={(e) =>
                                        updateStatus(
                                            d._id,
                                            e.target.value
                                        )
                                    }
                                >
                                    <option>Pending</option>
                                    <option>Shipped</option>
                                    <option>Out for Delivery</option>
                                    <option>Delivered</option>
                                </select>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

const styles = {
    table: {
        width: "100%",
        borderCollapse: "collapse",
        marginTop: "20px",
        backgroundColor: "#fff",
    },

    badge: {
        padding: "5px 10px",
        borderRadius: "10px",
        backgroundColor: "#1976d2",
        color: "white",
    },
};

export default Order;