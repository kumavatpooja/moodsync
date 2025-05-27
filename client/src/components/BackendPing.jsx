import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";

function BackendPing() {
  const [message, setMessage] = useState("Pinging backend...");

  useEffect(() => {
    fetch(`${BACKEND_URL}/api/test/ping`)
      .then(res => res.json())
      .then(data => setMessage(data.message))
      .catch(() => setMessage("❌ Backend not reachable"));
  }, []);

  return <p className="text-sm text-green-400">{message}</p>;
}

export default BackendPing;
