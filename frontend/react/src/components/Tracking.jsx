import React from "react";

function Tracking() {
  const steps = [
    "Pending",
    "Shipped",
    "Out for Delivery",
    "Delivered",
  ];

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-6">
        Tracking System
      </h1>

      <div className="flex gap-4">
        {steps.map((step, i) => (
          <div key={i} className="flex-1 text-center">
            <div className="h-2 bg-blue-500 rounded"></div>
            <p className="mt-2 text-sm">{step}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Tracking;



