import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import bgImage from "../../assets/Images/bg-admin1.jpg";

export default function AdminLogin() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [keyCode, setKeyCode] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/admin/login", {
        name,
        email,
        password: keyCode
      });

      setMessage(`✅ ${res.data.message}`);

      // WAIT 1 second biar pesan sukses kebaca
      setTimeout(() => {
        navigate("/admin/dashboard");
      }, 1000);
    } catch (err) {
      setMessage(`❌ ${err.response?.data?.message || "Login failed"}`);
    }
  };

  return (
    <div
      className="relative flex items-center justify-center h-screen bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${bgImage})`
      }}
    >
      <div className="absolute inset-0 bg-black/60"></div>

      <form
        onSubmit={handleLogin}
        className="relative z-10 rounded-2xl w-full max-w-[360px] px-6 py-10 md:px-10 md:py-14"
        style={{
          backgroundColor: "#43B573CC",
          backdropFilter: "blur(4px)",
          boxShadow: "0 8px 22px rgba(0,0,0,0.4)"
        }}
      >
        <label className="text-white text-sm tracking-wide">Name</label>
        <input
          type="text"
          className="w-full p-2.5 rounded bg-white text-gray-900 mb-4 focus:outline-none"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label className="text-white text-sm tracking-wide">Email</label>
        <input
          type="email"
          className="w-full p-2.5 rounded bg-white text-gray-900 mb-4 focus:outline-none"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label className="text-white text-sm tracking-wide">Key Code</label>
        <input
          type="password"
          className="w-full p-2.5 rounded bg-white text-gray-900 mb-6 focus:outline-none"
          value={keyCode}
          onChange={(e) => setKeyCode(e.target.value)}
        />

        <button
          type="submit"
          className="w-full py-2.5 rounded-full mx-auto bg-white text-[#43B573] font-semibold shadow hover:bg-gray-100 transition text-center"
          style={{ fontSize: "15px", width: "120px", display: "block" }}
        >
          Login
        </button>

        {message && (
          <p className="text-center mt-3 text-sm text-white">{message}</p>
        )}

        <p className="text-xs mt-6 text-white/90 text-left flex items-center gap-2 leading-snug">
          <span className="text-blue-300 text-base">ℹ️</span>
          <span>
            Jika Anda bukan Admin diharapkan{" "}
            <span className="text-red-500 font-semibold">keluar</span> dari page
            ini.
          </span>
        </p>
      </form>
    </div>
  );
}
