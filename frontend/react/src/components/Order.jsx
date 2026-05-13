import React, { useEffect, useState } from "react";
import API from "../services/api";

function Order() {
    const [deliveries, setDeliveries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isSyncing, setIsSyncing] = useState(false);

    useEffect(() => {
        fetchDeliveries();
    }, []);

    const fetchDeliveries = async () => {
        try {
            const res = await API.get("/");
            setDeliveries(res.data);
        } catch (err) {
            console.error("Error fetching deliveries:", err);
        } finally {
            setLoading(false);
        }
    };

    const updateStatus = async (id, status) => {
        try {
            await API.put(`/${id}`, { status });

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

    const handleSync = async () => {
        setIsSyncing(true);
        try {
            // This calls the POST route in your backend that uses Axios to fetch central orders
            const res = await API.post("/sync-all");
            alert(res.data.message);
            
            // Refresh the table after syncing
            fetchDeliveries(); 
        } catch (err) {
            console.error("Sync failed:", err);
            alert("Failed to sync with the Order Management System.");
        } finally {
            setIsSyncing(false);
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
                    Deliveries
                </h2>

                <button 
                    onClick={handleSync} 
                    disabled={isSyncing}
                    style={isSyncing ? styles.syncBtnDisabled : styles.syncBtn}
                >
                    {isSyncing ? "Syncing..." : "Sync Orders from Central System"}
                </button>

                <div style={styles.tableBox}>
                    <table style={styles.table}>
                        <thead>
                            <tr>
                                <th>Delivery ID</th>
                                <th>Estimated Delivery</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {deliveries.map((d) => (
                                <tr key={d._id}>
                                    <td>{d.delivery_id}</td>
                                    <td>{d.estimated_delivery}</td>
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