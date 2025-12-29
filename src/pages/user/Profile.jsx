import React, { useState } from "react";
import {
  Menu,
  Home,
  User,
  History,
  HelpCircle,
  Volume2,
  LogOut
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";
import { useEffect } from "react";
import { getMyProfile, updateMyProfile } from "../../services/userService";

const ProfilePage = () => {
  const [openSidebar, setOpenSidebar] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  const [profile, setProfile] = useState({
    first_name: "",
    last_name: "",
    email: "",
    username: "",
    avatar: ""
  });
  const [showFAQ, setShowFAQ] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getMyProfile();
        setProfile(data);
      } catch (error) {
        console.error("Gagal ambil profile", error);
      }
    };

    fetchProfile();
  }, []);

  const navigate = useNavigate();

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const preview = URL.createObjectURL(file);
    setProfile((prev) => ({
      ...prev,
      avatar: preview
    }));
  };

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = async () => {
    try {
      await updateMyProfile(profile);
      setIsEditing(false);
      alert("Profile berhasil diperbarui");
    } catch (error) {
      console.error(error);
      alert("Gagal update profile");
    }
  };

  const handleDelete = () => {
    setProfile((prev) => ({
      ...prev,
      avatar: ""
    }));
  };


  return (
    <div className="w-full min-h-screen bg-[#dedede] flex relative">
      {/* HAMBURGER MOBILE */}
      <button
        onClick={() => setOpenSidebar(!openSidebar)}
        className="absolute top-4 right-4 z-50 bg-white p-2 rounded-lg shadow sm:hidden"
      >
        {openSidebar ? (
          <X className="text-[#4dbd74]" size={28} />
        ) : (
          <Menu className="text-[#4dbd74]" size={28} />
        )}
      </button>
      {/* SIDEBAR */}
      <div
        className={`bg-white shadow-lg h-screen p-6 flex flex-col transition-all duration-300
        fixed sm:relative z-40
        ${openSidebar ? "w-64 left-0" : "w-20 -left-20 sm:left-0"}`}
      >
        {/* Hamburger */}
        <button
          onClick={() => setOpenSidebar(!openSidebar)}
          className="mb-6 text-[#4dbd74]"
        >
          <Menu size={28} />
        </button>
        {/* MENU LIST */}
        <ul className="space-y-4 mt-10">
          <li
            onClick={() => {
              navigate("/user/home");
              setOpenSidebar(false);
            }}
            className={`flex items-center gap-3 px-3 py-2 rounded-xl cursor-pointer ${
              openSidebar && "hover:bg-[#e8f7f0]"
            }`}
          >
            <Home className="text-[#4dbd74]" />
            {openSidebar && <span>Home</span>}
          </li>

          <li className="flex items-center gap-3 px-3 py-2 rounded-xl bg-[#4dbd74] text-white">
            <User />
            {openSidebar && <span>Profile</span>}
          </li>

          <li
            onClick={() => {
              navigate("/pembelian-tiket");
              setOpenSidebar(false);
            }}
            className={`flex items-center gap-3 px-3 py-2 rounded-xl cursor-pointer ${
              openSidebar && "hover:bg-[#e8f7f0]"
            }`}
          >
            <History className="text-[#4dbd74]" />
            {openSidebar && <span>Riwayat Pembelian</span>}
          </li>

          <li
            onClick={() => {
              setShowFAQ(true);
              setShowUpdate(false);
              setOpenSidebar(false);
            }}
            className={`flex items-center gap-3 px-3 py-2 rounded-xl cursor-pointer ${
              openSidebar && "hover:bg-[#e8f7f0]"
            }`}
          >
            <HelpCircle className="text-[#4dbd74]" />
            {openSidebar && <span>FAQ</span>}
          </li>

          <li
            onClick={() => {
              setShowUpdate(true);
              setShowFAQ(false);
              setOpenSidebar(false);
            }}
            className={`flex items-center gap-3 px-3 py-2 rounded-xl cursor-pointer ${
              openSidebar && "hover:bg-[#e8f7f0]"
            }`}
          >
            <Volume2 className="text-[#4dbd74]" />
            {openSidebar && <span>Pengumuman Update</span>}
          </li>

          <li
            onClick={() => navigate("/user/login")}
            className={`flex items-center gap-3 px-3 py-2 rounded-xl cursor-pointer ${
              openSidebar && "hover:bg-[#e8f7f0]"
            }`}
          >
            <LogOut className="text-red-600" />
            {openSidebar && <span>Logout</span>}
          </li>
        </ul>
      </div>

      {/* OVERLAY MOBILE */}
      {openSidebar && (
        <div
          onClick={() => setOpenSidebar(false)}
          className="fixed inset-0 bg-black/30 sm:hidden z-30"
        />
      )}

      {/* MAIN CONTENT */}
      <div className="flex-1 p-4 sm:p-10">
        <p className="text-gray-600 mb-4 text-sm">
          Beranda <span className="mx-2">/</span> Profile
        </p>

        <h1 className="text-xl sm:text-2xl font-semibold mb-6">
          Informasi Personal
        </h1>

        {/* PROFILE CARD */}
        <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-md flex flex-col sm:flex-row items-center gap-6 mb-10 max-w-4xl">
          <img
            src={
              profile.avatar
                ? profile.avatar
                : "https://via.placeholder.com/150?text=No+Image"
            }
            className="w-24 h-24 rounded-full object-cover border"
          />

          <input
            type="file"
            accept="image/*"
            id="avatarInput"
            className="hidden"
            onChange={handleUpload}
          />

          <div className="flex gap-3">
            <button
              disabled={!isEditing}
              onClick={() => document.getElementById("avatarInput").click()}
              className={`px-5 py-2 rounded-full text-white
    ${isEditing ? "bg-[#4dbd74]" : "bg-gray-400 cursor-not-allowed"}`}
            >
              Upload
            </button>

            <button
              disabled={!isEditing}
              onClick={handleDelete}
              className={`px-5 py-2 rounded-full text-white
    ${isEditing ? "bg-red-500" : "bg-gray-400 cursor-not-allowed"}`}
            >
              Hapus
            </button>
          </div>
        </div>

        {/* FORM */}
        <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-md max-w-4xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="text-gray-700">Nama Awal</label>
              <input
                type="text"
                name="first_name"
                value={profile.first_name || ""}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full mt-1 p-2 border rounded-lg"
              />
            </div>

            <div>
              <label className="text-gray-700">Nama Akhir</label>
              <input
                type="text"
                name="last_name"
                value={profile.last_name || ""}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full mt-1 p-2 border rounded-lg"
              />
            </div>

            <div>
              <label className="text-gray-700">Email</label>
              <input
                type="text"
                name="email"
                value={profile.email || ""}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full mt-1 p-2 border rounded-lg"
              />
            </div>

            <div>
              <label className="text-gray-700">Username</label>
              <input
                type="text"
                name="username"
                value={profile.username || ""}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full mt-1 p-2 border rounded-lg"
              />
            </div>
          </div>

          <div className="flex justify-end">
            <button
              onClick={isEditing ? handleSave : () => setIsEditing(true)}
              className="px-6 py-2 bg-[#4dbd74] text-white rounded-full"
            >
              {isEditing ? "Simpan" : "Edit"}
            </button>
          </div>
        </div>
      </div>

      {/* FAQ MODAL */}
      {showFAQ && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
          <div className="bg-white w-full max-w-xl rounded-2xl p-6 shadow-lg relative">
            <button
              onClick={() => setShowFAQ(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-red-500"
            >
              <X />
            </button>

            <h2 className="text-xl font-semibold mb-4">
              Frequently Asked Questions
            </h2>

            <div className="space-y-4 text-sm text-gray-700">
              <div>
                <p className="font-medium">
                  Bagaimana cara membeli tiket wisata?
                </p>
                <p>
                  Pilih destinasi wisata, tentukan tanggal kunjungan, lalu
                  lakukan pembayaran melalui metode yang tersedia.
                </p>
              </div>

              <div>
                <p className="font-medium">Apakah tiket bisa dibatalkan?</p>
                <p>
                  Pembatalan tiket mengikuti kebijakan masing-masing penyedia
                  wisata dan dapat dilihat sebelum checkout.
                </p>
              </div>

              <div>
                <p className="font-medium">
                  Apakah tiket langsung aktif setelah bayar?
                </p>
                <p>
                  Ya, setelah pembayaran berhasil tiket akan langsung aktif dan
                  dapat dilihat di riwayat pembelian.
                </p>
              </div>

              <div>
                <p className="font-medium">
                  Bagaimana jika terjadi kendala saat masuk wisata?
                </p>
                <p>
                  Silakan hubungi customer service melalui menu bantuan atau
                  kontak yang tersedia.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* UPDATE MODAL */}
      {showUpdate && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
          <div className="bg-white w-full max-w-lg rounded-2xl p-6 shadow-lg relative">
            <button
              onClick={() => setShowUpdate(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-red-500"
            >
              <X />
            </button>

            <h2 className="text-xl font-semibold mb-4">Pengumuman Update</h2>

            <div className="text-gray-600 text-sm">
              <p>Saat ini belum ada pengumuman atau pembaruan sistem.</p>
              <p className="mt-2">
                Silakan cek kembali secara berkala untuk mendapatkan informasi
                terbaru.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
