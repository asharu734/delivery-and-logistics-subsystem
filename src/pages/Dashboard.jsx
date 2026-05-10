
// import React, { useEffect, useState } from "react";

// import { getDeliveries } from "../services/deliveries";
// import { getInventory } from "../services/inventory";
// import { getOrders } from "../services/orders";

// function Dashboard() {
//     const [deliveries, setDeliveries] = useState([]);
//     const [inventory, setInventory] = useState([]);
//     const [orders, setOrders] = useState([]);

//     useEffect(() => {
//         loadData();
//     }, []);

//     const loadData = async () => {
//         try {
//             const [d, i, o] = await Promise.all([
//                 getDeliveries(),
//                 getInventory(),
//                 getOrders(),
//             ]);

//             setDeliveries(d.data);
//             setInventory(i.data);
//             setOrders(o.data);
//         } catch (err) {
//             console.log(err);
//         }
//     };

//     // ======================
//     // LOGISTICS INTELLIGENCE
//     // ======================

//     const totalDeliveries = deliveries.length;

//     const pending = deliveries.filter(
//         d => d.status === "Pending"
//     ).length;

//     const inTransit = deliveries.filter(
//         d =>
//             d.status === "Shipped" ||
//             d.status === "Out for Delivery"
//     ).length;

//     const delivered = deliveries.filter(
//         d => d.status === "Delivered"
//     ).length;

//     const lowStock = inventory.filter(
//         i => i.quantity < 10
//     ).length;

//     return (
//         <div style={styles.container}>
//             <h1 style={styles.title}>
//                 Logistics Control Center
//             </h1>

//             {/* KPI GRID */}
//             <div style={styles.grid}>
//                 <Card title="Orders" value={orders.length} color="#673ab7" />
//                 <Card title="Deliveries" value={totalDeliveries} color="#1976d2" />
//                 <Card title="Pending" value={pending} color="#ff9800" />
//                 <Card title="In Transit" value={inTransit} color="#2196f3" />
//                 <Card title="Delivered" value={delivered} color="#4caf50" />
//                 <Card title="Low Stock Alerts" value={lowStock} color="#f44336" />
//             </div>
//         </div>
//     );
// }

// /* ===================== */
// /* COMPONENT */
// /* ===================== */

// function Card({ title, value, color }) {
//     return (
//         <div style={{ ...styles.card, borderTop: `4px solid ${color}` }}>
//             <h4>{title}</h4>
//             <h2>{value}</h2>
//         </div>
//     );
// }

// /* ===================== */
// /* STYLES */
// /* ===================== */

// const styles = {
//     container: {
//         padding: "20px",
//         backgroundColor: "#f4f6f8",
//         minHeight: "100vh",
//     },

//     title: {
//         fontSize: "28px",
//         fontWeight: "bold",
//         marginBottom: "20px",
//     },

//     grid: {
//         display: "grid",
//         gridTemplateColumns: "repeat(3, 1fr)",
//         gap: "15px",
//     },

//     card: {
//         backgroundColor: "white",
//         padding: "20px",
//         borderRadius: "12px",
//         boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
//     },

//     section: {
//         marginTop: "30px",
//         backgroundColor: "white",
//         padding: "20px",
//         borderRadius: "12px",
//     },
// };

// export default Dashboard;

import React, { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
    const DELIVERIES_URI =
        "https://customer-and-order-mgmt-system.vercel.app/api/deliveries";

    const [deliveries, setDeliveries] = useState([]);
    const [view, setView] = useState("dashboard");
    const [selectedData, setSelectedData] = useState([]);

    useEffect(() => {
        fetchDeliveries();
    }, []);

    const fetchDeliveries = async () => {
        try {
            const res = await axios.get(DELIVERIES_URI);
            setDeliveries(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    // ======================
    // STATS
    // ======================
    const total = deliveries.length;

    const pending = deliveries.filter(
        (d) => d.status === "Pending"
    ).length;

    const inTransit = deliveries.filter(
        (d) =>
            d.status === "Shipped" ||
            d.status === "Out for Delivery"
    ).length;

    const delivered = deliveries.filter(
        (d) => d.status === "Delivered"
    ).length;

    // ======================
    // VIEW HANDLER
    // ======================
    const openView = (type) => {
        setView(type);

        if (type === "pending") {
            setSelectedData(
                deliveries.filter(
                    (d) => d.status === "Pending"
                )
            );
        }

        if (type === "inTransit") {
            setSelectedData(
                deliveries.filter(
                    (d) =>
                        d.status === "Shipped" ||
                        d.status === "Out for Delivery"
                )
            );
        }

        if (type === "delivered") {
            setSelectedData(
                deliveries.filter(
                    (d) => d.status === "Delivered"
                )
            );
        }
    };

    // ======================
    // UPDATE STATUS
    // ======================
    const updateStatus = async (id, status) => {
        try {
            await axios.put(
                `${DELIVERIES_URI}/${id}`,
                { status }
            );

            fetchDeliveries();
        } catch (err) {
            alert("Update failed");
        }
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>
                Logistics Control Center
            </h1>

            {/* BACK BUTTON */}
            {view !== "dashboard" && (
                <button
                    onClick={() => setView("dashboard")}
                    style={styles.backBtn}
                    onMouseOver={(e) =>
                        (e.target.style.backgroundColor =
                            "#1565c0")
                    }
                    onMouseOut={(e) =>
                        (e.target.style.backgroundColor =
                            "#1976d2")
                    }
                >
                    ← Back to Dashboard
                </button>
            )}

            {/* DASHBOARD VIEW */}
            {view === "dashboard" && (
                <div style={styles.grid}>
                    <Card
                        title="Total Deliveries"
                        value={total}
                        color="#1976d2"
                    />

                    <Card
                        title="Pending"
                        value={pending}
                        color="#ff9800"
                        onClick={() => openView("pending")}
                    />

                    <Card
                        title="In Transit"
                        value={inTransit}
                        color="#2196f3"
                        onClick={() =>
                            openView("inTransit")
                        }
                    />

                    <Card
                        title="Delivered"
                        value={delivered}
                        color="#4caf50"
                        onClick={() =>
                            openView("delivered")
                        }
                    />
                </div>
            )}

            {/* LIST VIEW */}
            {view !== "dashboard" && (
                <div style={styles.tableBox}>
                    <h2>
                        {view.toUpperCase()} ORDERS
                    </h2>

                    <table style={styles.table}>
                        <thead>
                            <tr>
                                <th>Order ID</th>
                                <th>Tracking No.</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {selectedData.map((d) => (
                                <tr key={d._id}>
                                    <td>{d.orderId}</td>
                                    <td>
                                        {d.trackingNumber}
                                    </td>
                                    <td>{d.status}</td>
                                    <td>
                                        <select
                                            value={d.status}
                                            onChange={(e) =>
                                                updateStatus(
                                                    d._id,
                                                    e.target
                                                        .value
                                                )
                                            }
                                        >
                                            <option>
                                                Pending
                                            </option>
                                            <option>
                                                Shipped
                                            </option>
                                            <option>
                                                Out for
                                                Delivery
                                            </option>
                                            <option>
                                                Delivered
                                            </option>
                                        </select>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

/* ===================== */
/* CARD COMPONENT */
/* ===================== */
function Card({ title, value, color, onClick }) {
    return (
        <div
            onClick={onClick}
            style={{
                ...styles.card,
                borderTop: `4px solid ${color}`,
                cursor: onClick ? "pointer" : "default",
            }}
        >
            <h4>{title}</h4>
            <h2>{value}</h2>

            {onClick && (
                <span style={styles.clickHint}>
                    Click to view →
                </span>
            )}
        </div>
    );
}

/* ===================== */
/* STYLES */
/* ===================== */
const styles = {
    container: {
        padding: "20px",
        backgroundColor: "#f4f6f8",
        minHeight: "100vh",
    },

    title: {
        fontSize: "28px",
        fontWeight: "bold",
        marginBottom: "20px",
    },

    grid: {
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: "15px",
    },

    card: {
        backgroundColor: "white",
        padding: "20px",
        borderRadius: "12px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
        transition: "0.2s",
    },

    // 🔥 CLICK TO VIEW BADGE
    clickHint: {
        marginTop: "8px",
        display: "inline-block",
        padding: "4px 8px",
        fontSize: "12px",
        fontWeight: "500",
        backgroundColor: "#e3f2fd",
        color: "#1976d2",
        borderRadius: "6px",
    },

    // 🔥 BACK BUTTON (PRO STYLE)
    backBtn: {
        marginBottom: "15px",
        padding: "10px 14px",
        cursor: "pointer",
        backgroundColor: "#1976d2",
        color: "white",
        border: "none",
        borderRadius: "8px",
        fontWeight: "500",
        boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
        transition: "0.2s",
    },

    tableBox: {
        backgroundColor: "white",
        padding: "20px",
        borderRadius: "12px",
        marginTop: "20px",
    },

    table: {
        width: "100%",
        marginTop: "10px",
        borderCollapse: "collapse",
    },
};

export default Dashboard;