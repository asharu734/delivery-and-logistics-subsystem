import React from "react";

function Topbar() {
  return (
    <div className="w-full h-[60px] bg-white shadow flex items-center justify-between px-6 rounded-md mb-4">
      
      {/* LEFT */}
      <div className="font-bold text-[#007BDA] text-lg">
        Logistics Admin Panel
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-4">
        <div className="text-sm text-gray-500">
          Admin
        </div>

        <div className="w-8 h-8 rounded-full bg-[#007BDA] text-white flex items-center justify-center">
          A
        </div>
      </div>

    </div>
  );
}

export default Topbar;