import React, { useEffect, useState } from "react";
import API from "https://delivery-and-logistics-subsystem.onrender.com/api/deliveries";

function Order() {
    const [deliveries, setDeliveries] = useState([]);
    const [loading, setLoading] = useState(true);

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

    const updateStatus = async (id, status) => {
        try {
            await API.put(`/deliveries/${id}`, { status });

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

    if (loading) return <h3>Loading deliveries...</h3>;

    return (
        <div style={styles.wrapper}>
            {/* SIDEBAR SPACE (matches dashboard fix) */}
            <div style={styles.sidebarSpace}></div>

            {/* MAIN CONTENT */}
            <div style={styles.container}>
                <h2 style={styles.title}>
                    Orders / Deliveries
                </h2>

                <div style={styles.tableBox}>
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
                                            <option>
                                                Out for Delivery
                                            </option>
                                            <option>Delivered</option>
                                        </select>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

/* ===================== */
/* STYLES */
/* ===================== */
const styles = {
    wrapper: {
        display: "flex",
        minHeight: "100vh",
        backgroundColor: "#f4f6f8",
    },

    sidebarSpace: {
        width: "250px", // adjust if your sidebar width differs
        flexShrink: 0,
    },

    container: {
        flex: 1,
        padding: "20px",
    },

    title: {
        fontSize: "26px",
        fontWeight: "bold",
        marginBottom: "15px",
    },

    tableBox: {
        backgroundColor: "white",
        padding: "15px",
        borderRadius: "12px",
        overflowX: "auto", // 🔥 prevents overflow issues
    },

    table: {
        width: "100%",
        borderCollapse: "collapse",
        minWidth: "600px",
    },

    badge: {
        padding: "5px 10px",
        borderRadius: "10px",
        backgroundColor: "#1976d2",
        color: "white",
        fontSize: "12px",
    },
};

export default Order;