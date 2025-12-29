import { Search, ShoppingCart, User, ChevronDown } from "lucide-react";
import { NavLink } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { getPublicEvents } from "../../services/eventService";

const HomePage = () => {
  const PLACEHOLDER =
    "data:image/svg+xml;utf8,\
  <svg xmlns='http://www.w3.org/2000/svg' width='400' height='300'>\
    <rect width='100%' height='100%' fill='%23e5e7eb'/>\
    <text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle'\
      fill='%236b7280' font-size='20'>Menunggu Admin</text>\
  </svg>";

  const getImageUrl = (image) => {
    if (!image) return PLACEHOLDER;
    if (image.startsWith("http")) return image;
    return `http://localhost:5000/uploads/${image}`;
  };

  const [events, setEvents] = useState([]);
  useEffect(() => {
    getPublicEvents()
      .then((data) => setEvents(data || []))
      .catch(() => setEvents([]));
  }, []);

  return (
    <div className="w-full min-h-screen bg-[#dedede] flex flex-col items-center">
      {/* HEADER */}
      {/* NAVBAR */}
      <div className="w-full max-w-[1100px] px-4 mt-6 bg-[#4dbd74] py-4 rounded-full flex items-center justify-between">
        {/* Logo + Icon */}
        <NavLink
          to="/user/home"
          className="flex items-center gap-3 text-white font-bold text-xl hover:opacity-90"
        >
          Alamora
          <img
            src="/src/assets/Images/logo1.png"
            alt="Logo"
            className="w-8 h-8 object-cover rounded-full"
          />
        </NavLink>

        {/* Search */}
        <div className="hidden md:flex items-center bg-white px-5 py-2 rounded-full w-[400px] shadow-sm">
          <input
            type="text"
            placeholder="Cari wisata..."
            className="outline-none flex-1 text-gray-700"
          />
          <Search className="text-gray-500" size={20} />
        </div>

        {/* Icons */}
        <div className="flex items-center gap-4 md:gap-6 text-white">
          <NavLink to="/pembelian-tiket">
            <ShoppingCart
              size={26}
              className="cursor-pointer hover:opacity-80"
            />
          </NavLink>
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              isActive ? "text-[#43B573] font-semibold" : "hover:text-green-600"
            }
          >
            <User size={26} className="cursor-pointer hover:opacity-80" />
          </NavLink>
        </div>
      </div>

      {/* BANNER PROMO */}
      <div className="w-full max-w-[1100px] px-4 mt-12 relative">
        <img
          src="https://images.unsplash.com/photo-1538582709238-0a503bd5ae04?q"
          alt="banner"
          className="rounded-2xl w-full h-[280px] object-cover"
        />
        <div className="absolute top-4 left-4 md:top-6 md:left-6 bg-[#2c89b3] text-white p-4 md:p-6 rounded-2xl w-[90%] md:w-[350px]">
          <h1 className="text-2xl font-bold">Dapatkan Diskon 50%</h1>
          <p className="text-sm mt-2">
            Hemat dengan diskon yang kami berikan! Hanya di Alamora
          </p>
          <button className="px-4 py-2 mt-4 bg-white text-[#2c89b3] rounded-xl">
            Selengkapnya
          </button>
        </div>
      </div>

      {/* SECTION 1 */}
      <div className="w-full max-w-[1100px] px-4 mt-16">
        <div className="flex flex-col sm:flex-row justify-between gap-4 sm:items-center">
          <h2 className="text-lg font-bold">Wisata Lokal / Semua</h2>

          <button className="flex items-center gap-2 bg-[#4dbd74] text-white px-4 py-2 rounded-full">
            Urutkan <ChevronDown size={16} />
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
          {events
            .filter((e) => e.type === "rekomendasi")
            .slice(0, 4)
            .map((item) => (
              <div
                key={item.id}
                className="bg-white p-3 rounded-2xl shadow flex flex-col items-center hover:scale-[1.02] transition"
              >
                <img
                  src={getImageUrl(item.image)}
                  onError={(e) => (e.target.src = PLACEHOLDER)}
                  className="w-full h-[130px] rounded-xl object-cover"
                />

                <h3 className="mt-3 font-semibold text-center">{item.title}</h3>

                {/* ✅ HANYA HARGA YANG BISA DIKLIK */}
                <NavLink to={`/detail/${item.id}`} className="mt-2">
                  <div className="px-4 py-1 bg-[#4dbd74] text-white rounded-full text-sm cursor-pointer hover:bg-green-600 transition">
                    Rp {item.price.toLocaleString()}
                  </div>
                </NavLink>
              </div>
            ))}
        </div>

        <div className="flex justify-end mt-6">
          <button className="bg-[#4dbd74] text-white px-6 py-2 rounded-full">
            Muat Lebih Banyak
          </button>
        </div>
      </div>

      {/* PROMO 2 */}
      <div className="w-full max-w-[1100px] mt-16 flex flex-col lg:flex-row gap-6 px-4">
        <img
          src="https://images.unsplash.com/photo-1555043722-4523972f07ee?q"
          className="rounded-2xl w-[55%] h-[250px] object-cover"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
          {events
            .filter((e) => e.type === "rekomendasi")
            .slice(0, 4)
            .map((item) => (
              <div
                key={item.id}
                className="bg-white p-3 rounded-2xl shadow flex flex-col items-center hover:scale-[1.02] transition"
              >
                <img
                  src={getImageUrl(item.image)}
                  onError={(e) => (e.target.src = PLACEHOLDER)}
                  className="w-full h-[130px] rounded-xl object-cover"
                />
                <h3 className="mt-3 font-semibold text-center">{item.title}</h3>

                {/* ✅ HANYA HARGA YANG BISA DIKLIK */}
                <NavLink to={`/detail/${item.id}`} className="mt-2">
                  <div className="px-4 py-1 bg-[#4dbd74] text-white rounded-full text-sm cursor-pointer hover:bg-green-600 transition">
                    Rp {item.price.toLocaleString()}
                  </div>
                </NavLink>
              </div>
            ))}
        </div>
      </div>

      {/* SECTION 3 */}
      <div className="w-full max-w-[1100px] px-4 mt-20">
        <div className="flex flex-col sm:flex-row justify-between gap-4 sm:items-center">
          <h2 className="text-lg font-bold">Wisata Internasional / Semua</h2>

          <button className="flex items-center gap-2 bg-[#4dbd74] text-white px-4 py-2 rounded-full">
            Urutkan <ChevronDown size={16} />
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
          {events
            .filter((e) => e.type === "rekomendasi")
            .slice(0, 4)
            .map((item) => (
              <div
                key={item.id}
                className="bg-white p-3 rounded-2xl shadow flex flex-col items-center hover:scale-[1.02] transition"
              >
                <img
                  src={getImageUrl(item.image)}
                  onError={(e) => (e.target.src = PLACEHOLDER)}
                  className="w-full h-[130px] rounded-xl object-cover"
                />

                <h3 className="mt-3 font-semibold text-center">{item.title}</h3>

                {/* ✅ HANYA HARGA YANG BISA DIKLIK */}
                <NavLink to={`/detail/${item.id}`} className="mt-2">
                  <div className="px-4 py-1 bg-[#4dbd74] text-white rounded-full text-sm cursor-pointer hover:bg-green-600 transition">
                    Rp {item.price.toLocaleString()}
                  </div>
                </NavLink>
              </div>
            ))}
        </div>

        <div className="flex justify-end mt-6">
          <button className="bg-[#4dbd74] text-white px-6 py-2 rounded-full">
            Muat Lebih Banyak
          </button>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="bg-gray-300 py-10 w-full">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row gap-8 md:justify-between">
          <div>
            <h1 className="text-2xl font-semibold">Alamora</h1>
            <p className="text-gray-600 mt-3">
              Copyright © 2025 Alamora All Rights Reserved
            </p>
          </div>

          <div className="flex space-x-16">
            <ul className="text-gray-700 space-y-2">
              <li className="font-semibold">Tentang Kami</li>
              <li>Bantuan</li>
              <li>Privasi & Policy</li>
            </ul>

            <ul className="text-gray-700 space-y-2">
              <li className="font-semibold">Perjalanan Karir</li>
              <li>Kontak</li>
              <li>Tim Kami</li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
