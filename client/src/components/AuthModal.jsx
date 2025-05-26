import { useState } from "react";

function AuthModal({ onClose, onLoginSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true); // toggle between login/register

  const handleSubmit = (e) => {
    e.preventDefault();

    // For demo, just save dummy user to localStorage and call onLoginSuccess
    const dummyUser = {
      _id: "12345",
      email,
      name: "Demo User",
    };
    localStorage.setItem("user", JSON.stringify(dummyUser));

    onLoginSuccess();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-gray-900 rounded-lg p-8 w-96 max-w-full text-white">
        <h2 className="text-2xl font-bold mb-4">{isLogin ? "Login" : "Register"}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 rounded text-black"
          />
          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 rounded text-black"
          />
          <button
            type="submit"
            className="w-full bg-primary text-black py-2 rounded font-bold"
          >
            {isLogin ? "Login" : "Register"}
          </button>
        </form>
        <p className="mt-4 text-center text-gray-400">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-primary font-semibold"
          >
            {isLogin ? "Register here" : "Login here"}
          </button>
        </p>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white font-bold"
        >
          ✕
        </button>
      </div>
    </div>
  );
}

export default AuthModal;
