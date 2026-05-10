// import React, { useState } from "react";

// import Sidebar from "./components/Sidebar";
// import Navbar from "./components/Navbar";

// import Dashboard from "./pages/Dashboard";
// import Orders from "./pages/Orders";
// import Subsystems from "./pages/Subsystems";

// function App() {
//     const [page, setPage] = useState("dashboard");

//     return (
//         <div>
//             <Sidebar setPage={setPage} activePage={page} />
//             <Navbar />
            

//             <div style={styles.content}>
//                 {page === "dashboard" && <Dashboard />}
//                 {page === "orders" && <Orders />}
//                 {page === "subsystems" && <Subsystems />}
//             </div>
//         </div>
//     );
// }

// const styles = {
//     content: {
//         marginLeft: "220px",
//         marginTop: "70px",
//         padding: "20px",
//         backgroundColor: "#f4f6f8",
//         minHeight: "100vh",
//     },
// };

// export default App;

import React, { useState } from "react";

import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Orders from "./pages/Orders";

function App() {
  const [page, setPage] = useState("dashboard");

  return (
    <div className="flex">
      <Sidebar setPage={setPage} activePage={page} />

      <div className="ml-60 w-full p-6 bg-gray-100 min-h-screen">
        {page === "dashboard" && <Dashboard />}
        {page === "orders" && <Orders />}
      </div>
    </div>
  );
}

export default App;



