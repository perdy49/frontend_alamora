import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import googleIcon from "../../assets/Images/google.svg";
import facebookIcon from "../../assets/Images/facebook.svg";
import eye from "../../assets/Images/eye.svg";
import eyeOff from "../../assets/Images/eye-off.svg";


// ganti dengan gambar kamu
import img1 from "../../assets/Images/logo-login.png";

function LeftPanel({ images }) {
  const [i, setI] = useState(0);

  return (
    <div className="w-full h-full bg-[#F5DCA0] flex flex-col items-center justify-center p-10">
      <h2 className="text-xl mb-6 font-medium">Selamat Datang</h2>

      {/* IMAGE SLIDER */}
      <div className="relative">
        <div className="w-[260px] h-[260px] bg-[#E6F8EC] rounded-3xl overflow-hidden flex items-center justify-center shadow-md">
          <img
            src={images[i]}
            alt="slide"
            className="w-full h-full object-cover"
          />
        </div>

        {/* LEFT ARROW */}
        <button
          onClick={() => setI((i - 1 + images.length) % images.length)}
          className="absolute left-[-35px] top-1/2 -translate-y-1/2 bg-[#3DBA68] text-white w-10 h-10 rounded-full flex items-center justify-center"
        >
          {"<"}
        </button>

        {/* RIGHT ARROW */}
        <button
          onClick={() => setI((i + 1) % images.length)}
          className="absolute right-[-35px] top-1/2 -translate-y-1/2 bg-[#3DBA68] text-white w-10 h-10 rounded-full flex items-center justify-center"
        >
          {">"}
        </button>
      </div>

      {/* DOT INDICATOR */}
      <div className="flex gap-2 mt-4">
        {images.map((_, idx) => (
          <div
            key={idx}
            className={`w-3 h-3 rounded-full ${
              idx === i ? "bg-[#3DBA68]" : "bg-white border"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
}

export default function Login() {
  const [username, setUsername] = useState(""); // fix username input
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");

    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email: username, // tetap kirim sebagai email (backend aman)
        password
      });

      localStorage.setItem("token", res.data.token);
      navigate("/user/home");
    } catch (err) {
      setMsg(err.response?.data?.msg || "Login failed");
    }
  };

  const images = [img1, img1, img1];

  return (
    <div className="flex w-full min-h-screen flex-col md:flex-row items-stretch">
      {/* LEFT */}
      <div className="hidden md:block md:w-1/2">
        <LeftPanel images={images} />
      </div>

      {/* RIGHT */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-white px-4">
        <div className="w-full max-w-[360px] bg-[#D9D9D9] p-6 md:p-10 rounded-2xl shadow-md">
          <h1 className="text-center text-xl md:text-2xl font-semibold mb-8">
            Login
          </h1>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Username */}
            <div>
              <label className="text-sm">Username</label>
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full mt-2 p-3 rounded-xl bg-white border shadow-sm"
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
                  className="w-full mt-2 p-3 rounded-xl bg-white border shadow-sm pr-10"
                />

                {/* Eye Icon */}
                <button
                  type="button"
                  onClick={() => setShow(!show)}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  <img
                    src={show ? eyeOff : eye}
                    alt="toggle"
                    className="w-6 h-6 opacity-80 cursor-pointer"
                  />
                </button>
              </div>
            </div>

            {/* Forgot */}
            <div className="text-right">
              <Link className="text-sm text-green-600">Lupa Password?</Link>
            </div>

            {/* Submit button */}
            <button className="w-full bg-[#3DBA68] text-white rounded-md py-2 md:py-3 text-base md:text-lg shadow">
              Sign-In
            </button>

            {/* Error or success message */}
            {msg && (
              <div className="text-sm text-red-600 text-center">{msg}</div>
            )}

            {/* Social buttons */}
            <div className="flex justify-center gap-5 mt-4">
              {/* Google Button */}
              <button
                type="button"
                onClick={() => console.log("Google login clicked")}
                className="border rounded-full w-10 h-10 flex items-center justify-center bg-white shadow"
              >
                <img src={googleIcon} alt="google" className="w-5 h-5" />
              </button>

              {/* Facebook Button */}
              <button
                type="button"
                onClick={() => console.log("Facebook login clicked")}
                className="border rounded-full w-10 h-10 flex items-center justify-center bg-white shadow"
              >
                <img src={facebookIcon} alt="facebook" className="w-5 h-5" />
              </button>
            </div>

            {/* Register */}
            <div className="text-center text-sm mt-4">
              Buat Akun baru{" "}
              <Link to="/user/register" className="text-green-600">
                Register
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
