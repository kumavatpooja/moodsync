import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import AuthModal from "../components/AuthModal";

import moodAnimation from "../assets/mood-animation.gif";

import { FaGithub, FaLinkedin } from "react-icons/fa";

function Home() {
  const [showAuth, setShowAuth] = useState(false);
  const navigate = useNavigate();

  const handleLoginSuccess = () => {
    setShowAuth(false);
    alert("🎉 Successfully Registered / Logged In!");
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-dark text-white flex flex-col justify-between">
      <Navbar onLoginClick={() => setShowAuth(true)} />

      <main className="flex flex-col items-center justify-center py-12 px-4">
        {/* Mood Animation */}
        <img
          src={moodAnimation}
          alt="Mood Detection Animation"
          className="w-64 h-auto rounded-xl shadow-lg mb-6"
        />

        {/* MoodSync Logo */}
        <div className="flex items-center gap-4 mb-6">

</div>

        <p className="text-lg text-gray-300 text-center mb-6">
          Emotion-based Music Recommender
        </p>

        <button
          onClick={() => setShowAuth(true)}
          className="px-6 py-2 bg-yellow-500 text-black rounded-xl hover:bg-yellow-400"
        >
          Get Started
        </button>

        {/* About Project Section */}
        <section className="mt-16 max-w-5xl text-center">
          <h2 className="text-3xl font-semibold text-yellow-400 mb-4 animate-pulse">
            About MoodSync
          </h2>
          <p className="text-gray-300 leading-relaxed mb-8">
            MoodSync is an AI-powered music recommender system that detects your
            mood using facial expressions and suggests Bollywood songs to match your
            emotion. Built using the MERN stack and FaceAPI, MoodSync offers a unique
            and immersive music discovery experience.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-800 p-6 rounded-lg shadow hover:scale-105 transition">
              <img
                src="https://cdn-icons-png.flaticon.com/512/2920/2920266.png"
                alt="Real-time Detection"
                className="h-20 mx-auto mb-4"
              />
              <h3 className="text-lg font-bold text-yellow-300 mb-2">Real-Time Detection</h3>
              <p className="text-gray-400 text-sm">
                Uses FaceAPI to capture and analyze your mood instantly.
              </p>
            </div>

            <div className="bg-gray-800 p-6 rounded-lg shadow hover:scale-105 transition">
              <img
                src="https://cdn-icons-png.flaticon.com/512/2620/2620973.png"
                alt="Curated Music"
                className="h-20 mx-auto mb-4"
              />
              <h3 className="text-lg font-bold text-yellow-300 mb-2">Curated Music</h3>
              <p className="text-gray-400 text-sm">
                Enjoy personalized playlists based on happy, sad, angry and more moods.
              </p>
            </div>

            <div className="bg-gray-800 p-6 rounded-lg shadow hover:scale-105 transition">
              <img
                src="https://cdn-icons-png.flaticon.com/512/3038/3038326.png"
                alt="Tech Stack"
                className="h-20 mx-auto mb-4"
              />
              <h3 className="text-lg font-bold text-yellow-300 mb-2">Built With MERN</h3>
              <p className="text-gray-400 text-sm">
                Developed using MongoDB, Express, React, Node.js & Tailwind CSS.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
     

      <footer className="text-center py-6 border-t border-gray-700 text-gray-400 text-sm">
  <div className="flex justify-center items-center gap-4 mb-2">
    <a
      href="https://github.com/kumavatpooja"
      target="_blank"
      rel="noopener noreferrer"
      className="hover:text-white transition"
    >
      <FaGithub size={24} />
    </a>
    <a
      href="https://linkedin.com/in/pooja-kumavat-b52782228"
      target="_blank"
      rel="noopener noreferrer"
      className="hover:text-white transition"
    >
      <FaLinkedin size={24} />
    </a>
  </div>
  Developed by Pooja Kumavat | Email: kumavatpooja232@gmail.com
</footer>


      {/* Auth Modal */}
      {showAuth && (
        <AuthModal
          onClose={() => setShowAuth(false)}
          onLoginSuccess={handleLoginSuccess}
        />
      )}
    </div>
  );
}

export default Home;
