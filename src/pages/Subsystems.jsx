import React from "react";

function Subsystems() {
    return (
        <div>
            <h1>Connected Subsystems</h1>

            <div style={styles.container}>
                <a
                    style={styles.card}
                    href="https://customer-and-order-mgmt-system.vercel.app"
                    target="_blank"
                >
                    Customer & Order System
                </a>

                <a
                    style={styles.card}
                    href="https://inventory-subsystem-api.onrender.com"
                    target="_blank"
                >
                    Inventory System
                </a>
            </div>
        </div>
    );
}

const styles = {
    container: {
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        marginTop: "20px",
    },

    card: {
        padding: "15px",
        backgroundColor: "#1976d2",
        color: "white",
        textDecoration: "none",
        borderRadius: "8px",
    },
};

export default Subsystems;