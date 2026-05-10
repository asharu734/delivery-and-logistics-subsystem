// import React from "react";

// function Navbar() {
//     return (
//         <div style={styles.navbar}>
//             <h3>Delivery & Logistics System</h3>
//         </div>
//     );
// }

// const styles = {
//     navbar: {
//         height: "60px",
//         backgroundColor: "#f5f5f5",
//         display: "flex",
//         alignItems: "center",
//         paddingLeft: "220px",
//         borderBottom: "1px solid #ccc",
//     },
// };

// export default Navbar;

import React from "react";

function Navbar() {
    return (
        <div style={styles.navbar}>
            <h3>Delivery & Logistics Admin Panel</h3>
        </div>
    );
}

const styles = {
    navbar: {
        height: "60px",
        backgroundColor: "white",
        marginLeft: "220px",
        display: "flex",
        alignItems: "center",
        paddingLeft: "20px",
        boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
        position: "fixed",
        width: "100%",
        top: 0,
    },
};

export default Navbar;