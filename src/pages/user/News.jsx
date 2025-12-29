import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { getPublicNews } from "../../services/newsService";

const IMG_BASE = "http://localhost:5000/uploads";
const PLACEHOLDER = "https://via.placeholder.com/400x300?text=No+Image";

export default function WisataPage() {
  const [news, setNews] = useState([]);

  useEffect(() => {
    getPublicNews()
      .then((data) => setNews(Array.isArray(data) ? data : []))
      .catch(() => setNews([]));
  }, []);

  // ambil news untuk hero (aman walau kosong)
  const heroMain = news[0];
  const heroSide1 = news[1];
  const heroSide2 = news[2];

  return (
    <div className="w-full min-h-screen bg-gray-200 flex flex-col items-center">
      {/* NAVBAR */}
      <nav className="w-full bg-white py-4 shadow-sm">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-4">
          <div className="flex items-center space-x-3">
            <NavLink to="/user/home">
              <h1 className="text-2xl font-semibold">Alamora</h1>
            </NavLink>
            <img
              src="/src/assets/Images/logo1.png"
              alt="Logo"
              className="w-10 h-10 rounded-full object-cover"
            />
          </div>

          <ul className="hidden md:flex space-x-6 font-medium text-gray-700">
            <NavLink to="/user/home">Beranda</NavLink>
            <NavLink to="/berita-wisata">Berita-Wisata</NavLink>
            <NavLink to="/kunjungan">Kunjungan</NavLink>
            <NavLink to="/pembelian-tiket">Pembelian-Tiket</NavLink>
          </ul>
        </div>
      </nav>

      {/* SEARCH */}
      <div className="w-full md:w-[90%] lg:w-[80%] mx-auto mt-10 py-10 px-4">
        <div className="flex justify-center mb-16">
          <input
            placeholder="Cari Disini..."
            className="w-full md:w-[60%] px-5 py-3 rounded-full shadow bg-white border"
          />
        </div>

        {/* SECTION 1 - HERO NEWS */}
        <section className="relative mt-20 py-20 overflow-hidden">
          {/* BG MAP */}
          <div className="absolute inset-0 bg-[url('/src/assets/Images/fotoBg1.png')] bg-center bg-no-repeat bg-contain opacity-20" />

          <div className="relative z-10 max-w-6xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            {/* TEXT */}
            <div>
              <h1 className="text-4xl font-serif mb-4">
                {heroMain?.title || "The Lake District"}
              </h1>

              <p className="text-gray-700 leading-relaxed mb-6">
                {heroMain?.description ||
                  "Terletak di barat laut Inggris, The Lake District merupakan salah satu destinasi alam terindah yang memukau dengan danau jernih dan perbukitan hijau."}
              </p>

              <button className="px-6 py-2 bg-green-600 text-white rounded-full">
                Baca Selengkapnya
              </button>
            </div>

            {/* IMAGE GRID */}
            <div className="grid grid-cols-2 grid-rows-3 gap-4 h-[420px]">
              {/* FOTO UTAMA (ATAS, PANJANG) */}
              <img
                src={
                  heroMain?.image
                    ? `${IMG_BASE}/${heroMain.image}`
                    : PLACEHOLDER
                }
                className="col-span-2 row-span-2 w-full h-full object-cover rounded-2xl"
              />

              {/* FOTO KIRI BAWAH */}
              <img
                src={
                  heroSide1?.image
                    ? `${IMG_BASE}/${heroSide1.image}`
                    : PLACEHOLDER
                }
                className="w-full h-full object-cover rounded-2xl"
              />

              {/* FOTO KANAN BAWAH */}
              <img
                src={
                  heroSide2?.image
                    ? `${IMG_BASE}/${heroSide2.image}`
                    : PLACEHOLDER
                }
                className="w-full h-full object-cover rounded-2xl"
              />
            </div>
          </div>
        </section>

        {/* SECTION 2 - WISATA PILIHAN */}
        <section className="mt-32 max-w-6xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          {/* IMAGE */}
          <img
            src={news[3]?.image ? `${IMG_BASE}/${news[3].image}` : PLACEHOLDER}
            className="w-full h-[360px] object-cover rounded-xl"
          />

          {/* TEXT */}
          <div>
            <h1 className="text-4xl font-serif mb-4">
              {news[3]?.title || "Wisata Pilihan"}
            </h1>

            <p className="text-gray-700 mb-6 leading-relaxed">
              {news[3]?.description ||
                "Destinasi wisata pilihan dengan keindahan alam dan budaya yang memukau."}
            </p>

            <div className="flex gap-4">
              {[4, 5, 6].map((i) => (
                <img
                  key={i}
                  src={
                    news[i]?.image
                      ? `${IMG_BASE}/${news[i].image}`
                      : PLACEHOLDER
                  }
                  className="w-28 h-28 rounded-lg object-cover"
                />
              ))}
            </div>
          </div>
        </section>

        {/* BERITA TERKINI */}
        <div className="mt-24">
          <h1 className="text-3xl font-serif mb-6">Berita Terkini</h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {news.map((item) => (
              <div key={item.id} className="bg-white rounded-xl p-4 shadow">
                <img
                  src={item.image ? `${IMG_BASE}/${item.image}` : PLACEHOLDER}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />

                <p className="text-sm text-gray-500 mb-2">
                  {item.category} • {item.year}
                </p>

                <h3 className="font-semibold text-lg mb-2">{item.title}</h3>

                <p className="text-gray-700 mb-4 line-clamp-3">
                  {item.description}
                </p>

                <span className="text-green-600 font-medium cursor-pointer">
                  Lihat Selengkapnya
                </span>
              </div>
            ))}
          </div>
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
}
