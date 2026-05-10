
import React from "react";

function Sidebar({ setPage, activePage }) {
    return (
        <div style={styles.sidebar}>
            <h2 style={styles.logo}>LOGISTICS</h2>

            <button
                onClick={() => setPage("dashboard")}
                style={{
                    ...styles.link,
                    backgroundColor:
                        activePage === "dashboard"
                            ? "#1565c0"
                            : "transparent",
                }}
            >
                📊 Dashboard
            </button>

            <button
                onClick={() => setPage("orders")}
                style={{
                    ...styles.link,
                    backgroundColor:
                        activePage === "orders"
                            ? "#1565c0"
                            : "transparent",
                }}
            >
                📦 Orders
            </button>

            <button
                onClick={() => setPage("subsystems")}
                style={{
                    ...styles.link,
                    backgroundColor:
                        activePage === "subsystems"
                            ? "#1565c0"
                            : "transparent",
                }}
            >
                🔗 Subsystems
            </button>
        </div>
    );
}

const styles = {
    sidebar: {
        width: "220px",
        height: "100vh",
        backgroundColor: "#0d47a1",
        color: "white",
        position: "fixed",
        top: 0,
        left: 0,
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
    },

    logo: {
        marginBottom: "20px",
        fontSize: "20px",
        letterSpacing: "2px",
    },

    link: {
        color: "white",
        border: "none",
        textAlign: "left",
        padding: "12px",
        cursor: "pointer",
        borderRadius: "8px",
        fontSize: "14px",
    },
};

export default Sidebar;