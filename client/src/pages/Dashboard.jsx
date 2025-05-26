import { useEffect, useRef, useState } from "react";
import * as faceapi from "face-api.js";
import { useNavigate } from "react-router-dom";

const emotionToSongs = {
  happy: [
    "https://www.youtube.com/embed/II2EO3Nw4m0?autoplay=1",
    "https://www.youtube.com/embed/bw7bVpI5VcM?autoplay=1",
    "https://www.youtube.com/embed/NDjeeJwI08Q?autoplay=1",
  ],
  sad: [
    "https://www.youtube.com/embed/sVRwZEkXepg?autoplay=1",
    "https://www.youtube.com/embed/lBvbNxiVmZA?autoplay=1",
    "https://www.youtube.com/embed/dovWTFlRIWs?autoplay=1",
  ],
  angry: [
    "https://www.youtube.com/embed/BiVyN2ftrrs?autoplay=1",
    "https://www.youtube.com/embed/AKF2whlGnr4?autoplay=1",
    "https://www.youtube.com/embed/puKD3nkB1h4?autoplay=1",
  ],
  surprised: [
    "https://www.youtube.com/embed/osBCBg8WAsM?autoplay=1",
    "https://www.youtube.com/embed/v7_IXBXQIeA?autoplay=1",
    "https://www.youtube.com/embed/jCEdTq3j-0U?autoplay=1",
  ],
  neutral: [
    "https://www.youtube.com/embed/VhRwuWp4MQ8?autoplay=1",
    "https://www.youtube.com/embed/o4mHtJLgMLs?autoplay=1",
    "https://www.youtube.com/embed/9C008fKT5VM?autoplay=1",
  ],
  fearful: [
    "https://www.youtube.com/embed/_Bu9QLDTHX4?autoplay=1",
    "https://www.youtube.com/embed/C805Nt0JPIY?autoplay=1",
    "https://www.youtube.com/embed/Kjyr9JYd3-I?autoplay=1",
  ],
  disgusted: [
    "https://www.youtube.com/embed/pon8irRa8II?autoplay=1",
    "https://www.youtube.com/embed/wuqfOlHmBdQ?autoplay=1",
  ],
};

function Dashboard() {
  const videoRef = useRef(null);
  const [emotion, setEmotion] = useState(null);
  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [songIndex, setSongIndex] = useState(0);
  const navigate = useNavigate();

  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  useEffect(() => {
    if (!user) {
      navigate("/");
      return;
    }

    const loadModels = async () => {
      const MODEL_URL = "/models";
      await Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
        faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
      ]);
      setModelsLoaded(true);
    };

    loadModels();
  }, [navigate, user]);

  useEffect(() => {
    if (modelsLoaded && videoRef.current) {
      startVideo();
    }
  }, [modelsLoaded]);

  const startVideo = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        videoRef.current.srcObject = stream;
      })
      .catch((err) => console.error("Camera error:", err));
  };

  const handleVideoPlay = async () => {
    const interval = setInterval(async () => {
      const detections = await faceapi
        .detectSingleFace(videoRef.current, new faceapi.TinyFaceDetectorOptions())
        .withFaceExpressions();

      if (detections && detections.expressions) {
        const expressions = detections.expressions;
        const maxEmotion = Object.keys(expressions).reduce((a, b) =>
          expressions[a] > expressions[b] ? a : b
        );

        setEmotion((prev) => {
          if (prev !== maxEmotion) {
            setSongIndex(0);
          }
          return maxEmotion;
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  };

  const handleVideoEnd = () => {
    if (emotion && emotionToSongs[emotion]) {
      setSongIndex((prevIndex) => (prevIndex + 1) % emotionToSongs[emotion].length);
    }
  };

  const handleNextSong = () => {
    if (emotion && emotionToSongs[emotion]) {
      setSongIndex((prevIndex) => (prevIndex + 1) % emotionToSongs[emotion].length);
    }
  };

  const handlePrevSong = () => {
    if (emotion && emotionToSongs[emotion]) {
      setSongIndex((prevIndex) =>
        (prevIndex - 1 + emotionToSongs[emotion].length) % emotionToSongs[emotion].length
      );
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  const handleBackToLogin = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-dark text-white p-8 flex flex-col items-center justify-between">
      <div className="w-full flex justify-between items-center mb-4">
        <button
          onClick={handleBackToLogin}
          className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
        >
          Back to Login
        </button>
        <h2 className="text-2xl font-bold text-center flex-1">Welcome, {user?.name}</h2>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      

      <video
        ref={videoRef}
        autoPlay
        muted
        onPlay={handleVideoPlay}
        width="400"
        height="300"
        className="rounded-xl shadow-lg"
      />

      {emotion && (
        <p className="mt-4 text-xl text-primary font-semibold">
          Detected Emotion: {emotion}
        </p>
      )}

      {emotion && emotionToSongs[emotion] && (
        <div className="mt-6 w-full flex flex-col items-center gap-4">
          <iframe
            width="800"
            height="450"
            src={emotionToSongs[emotion][songIndex]}
            title="Emotion Based Video"
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
            className="rounded-lg shadow-lg"
            onEnded={handleVideoEnd}
          ></iframe>
          <div className="flex gap-4">
            <button
              onClick={handlePrevSong}
              className="bg-yellow-500 text-black px-4 py-2 rounded-lg shadow hover:bg-yellow-400 transition"
            >
              Previous Song
            </button>
            <button
              onClick={handleNextSong}
              className="bg-yellow-500 text-black px-4 py-2 rounded-lg shadow hover:bg-yellow-400 transition"
            >
              Next Song
            </button>
          </div>
        </div>
      )}

      <footer className="w-full text-center mt-10 text-gray-400 border-t pt-4">
        Developed by Pooja Kumavat | Email: pooja.kumavat@example.com
      </footer>
    </div>
  );
}

export default Dashboard;
