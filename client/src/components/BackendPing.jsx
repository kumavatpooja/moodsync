import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";

function BackendPing() {
  const [message, setMessage] = useState("Pinging backend...");

  useEffect(() => {
    fetch(`${BACKEND_URL}/api/test/ping`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => setMessage(`✅ ${data.message}`))
      .catch((err) => {
        console.error("❌ Backend fetch error:", err);
        setMessage("❌ Backend not reachable");
      });
  }, []);

  // Only show this in development
  return import.meta.env.MODE === "development" ? (
    <p className="text-sm text-green-400">{message}</p>
  ) : null;
}

export default BackendPing;
