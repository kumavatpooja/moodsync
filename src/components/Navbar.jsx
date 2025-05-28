import logo from "../assets/logo.png"; // Make sure logo.png exists in src/assets

function Navbar({ onLoginClick }) {
  return (
    <nav className="bg-gray-900 p-4 flex justify-between items-center">
      {/* Left: Logo + MoodSync */}
      <div className="flex items-center gap-2 cursor-pointer">
        <img src={logo} alt="MoodSync Logo" className="h-8 w-8 object-contain" />
        <h1 className="text-xl font-bold text-yellow-400">MoodSync</h1>
      </div>

      {/* Right: Login/Register */}
      <button
        onClick={onLoginClick}
        className="bg-yellow-400 text-black px-4 py-2 rounded font-semibold hover:bg-yellow-300"
      >
        Login / Register
      </button>
    </nav>
  );
}

export default Navbar;
