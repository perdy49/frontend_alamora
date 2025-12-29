import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

// Images
import img1 from "../../assets/Images/logo-register.png";

// Icons
import eyeIcon from "../../assets/Images/eye.svg";
import eyeOffIcon from "../../assets/Images/eye-off.svg";

function RightPanel({ images }) {
  const [i, setI] = useState(0);

  return (
    <div className="w-full h-full bg-yellow-100 p-12 flex flex-col items-center justify-center">
      <h2 className="mb-6 text-lg">Daftarkan Akunmu dulu ya</h2>

      {/* Image slider */}
      <div className="w-[260px] h-[260px] bg-green-50 rounded-2xl flex items-center justify-center overflow-hidden">
        <img
          src={images[i]}
          alt="slide"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Navigation */}
      <div className="mt-4 flex gap-4 items-center">
        <button
          onClick={() => setI((i - 1 + images.length) % images.length)}
          className="w-10 h-10 bg-green-500 text-white rounded-full text-xl flex items-center justify-center"
        >
          &lt;
        </button>

        {/* Dots */}
        <div className="flex items-center gap-2">
          {images.map((_, idx) => (
            <div
              key={idx}
              className={`w-3 h-3 rounded-full ${
                idx === i ? "bg-green-500" : "bg-white"
              }`}
            ></div>
          ))}
        </div>

        <button
          onClick={() => setI((i + 1) % images.length)}
          className="w-10 h-10 bg-green-500 text-white rounded-full text-xl flex items-center justify-center"
        >
          &gt;
        </button>
      </div>
    </div>
  );
}

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [msg, setMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");

    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", {
        username,
        email,
        password
      });

      setMsg("Akun berhasil dibuat. Silakan login.");
    } catch (err) {
      setMsg(err.response?.data?.msg || "Register failed");
    }
  };

  const images = [img1, img1, img1];

  return (
    <div className="flex w-full min-h-screen flex-col md:flex-row items-stretch">
      {/* LEFT FORM PANEL */}
      <div className="w-full md:w-1/2 bg-white px-4 md:p-10 flex items-center justify-center">
        <div className="w-full max-w-[350px] bg-gray-200 rounded-2xl p-6 md:p-8 shadow-md">
          <h1 className="text-center text-2xl mb-6 font-serif">
            Buat Akun Baru
          </h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Username */}
            <div>
              <label className="text-sm">Username</label>
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                className="w-full mt-2 p-3 rounded-xl input-card bg-white"
              />
            </div>

            {/* Email */}
            <div>
              <label className="text-sm">Email</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="w-full mt-2 p-3 rounded-xl input-card bg-white"
              />
            </div>

            {/* Password */}
            <div>
              <label className="text-sm">Password</label>
              <div className="relative">
                <input
                  type={show ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="w-full mt-2 p-3 rounded-xl input-card bg-white pr-12"
                />

                {/* Eye toggle */}
                <button
                  type="button"
                  onClick={() => setShow(!show)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-green-600 w-6 h-6"
                >
                  <img src={show ? eyeOffIcon : eyeIcon} alt="toggle" />
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-green-500 text-white rounded-md py-2 mt-2"
            >
              Buat Akun
            </button>

            {/* Message */}
            {msg && (
              <div className="text-sm mt-2 text-green-700 text-center">
                {msg}
              </div>
            )}

            {/* Back to login */}
            <div className="mt-4 text-center text-sm">
              Kembali Ke Login{" "}
              <Link to="/" className="text-green-600 font-medium">
                Log In
              </Link>
            </div>
          </form>
        </div>
      </div>

      {/* RIGHT IMAGE PANEL */}
      <div className="hidden md:block md:w-1/2">
        <RightPanel images={images} />
      </div>
    </div>
  );
}
