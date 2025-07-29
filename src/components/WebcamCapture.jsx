import React, { useRef, useState, useEffect } from "react";
import Webcam from "react-webcam";
import axios from "axios";
import { toast } from "react-toastify";

const WebcamCapture = ({ setServerStatus }) => {
  const webcamRef = useRef(null);
  const [result, setResult] = useState(null);

  const captureAndSend = async () => {
    const imageSrc = webcamRef.current.getScreenshot();
    const blob = await (await fetch(imageSrc)).blob();
    const formData = new FormData();
    formData.append("file", blob, "capture.jpg");

    try {
      setServerStatus && setServerStatus("detecting");
      const res = await axios.post("http://127.0.0.1:8000/api/detect", formData);
      setResult(res.data);
      setServerStatus && setServerStatus("connected");
      if (res.data.class_name.toLowerCase() === "fire") {
        toast.error(
          `🔥 Fire Detected!`, {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          }
        );
      }
    } catch (err) {
      setServerStatus && setServerStatus("offline");
      console.error("Detection error:", err);
    }
  };

  useEffect(() => {
    const interval = setInterval(captureAndSend, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-white relative">
      <div className="flex flex-col items-center relative">
        <Webcam
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          videoConstraints={{ width: 640, height: 480 }}
          className="rounded-2xl border-4 border-white bg-[#222] shadow-2xl"
        />

        {result && (
          <div className="mt-6 text-black text-center">
            <p className="text-2xl font-bold">Prediction: {result.class_name}</p>
            <p>Confidence: {result.confidence}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default WebcamCapture;
