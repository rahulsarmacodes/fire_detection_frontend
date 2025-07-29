import React from "react";
import iocl from "../assets/logo_iocl.png"

function Navbar({ serverStatus }) {
  let statusColor = "text-gray-500";
  let statusText = "Server Offline";
  if (serverStatus === "connected") {
    statusColor = "text-green-600";
    statusText = "Connected";
  } else if (serverStatus === "detecting") {
    statusColor = "text-yellow-600";
    statusText = "Detecting";
  } else if (serverStatus === "connecting") {
    statusColor = "text-blue-600";
    statusText = "Connecting";
  }
  return (
    <nav className="w-full flex items-center justify-between px-8 py-4 bg-white shadow-md mb-4">
      <div className="flex justify-center items-center">
        <img src={iocl} alt="" className="h-12" />
        <span className="text-2xl font-semibold text-orange-600">Fire Detection System IOCL</span>
      </div>
      <div>
        <span className={`font-semibold ${statusColor}`}>Server Status: {statusText}</span>
      </div>
      
    </nav>
  );
}

export default Navbar;