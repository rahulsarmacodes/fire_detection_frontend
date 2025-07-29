import React, { useState, useEffect } from "react";
import WebcamCapture from "./components/WebcamCapture";
import Navbar from "./components/Navbar";

function App() {
  const [serverStatus, setServerStatus] = useState("connecting");

  useEffect(() => {
    const checkHealth = async () => {
      try {
        setServerStatus("connecting");
        const res = await fetch("http://127.0.0.1:8000/api/health");
        if (res.ok) {
          setServerStatus("connected");
        } else {
          setServerStatus("offline");
        }
      } catch {
        setServerStatus("offline");
      }
    };
    checkHealth();
    const interval = setInterval(checkHealth, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="">
      <Navbar serverStatus={serverStatus} />
      <WebcamCapture serverStatus={serverStatus} />
    </div>
  );
}

export default App;
