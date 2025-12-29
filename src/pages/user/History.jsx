import React, { useEffect, useState } from "react";
import { getMyHistoryDetail } from "../../services/transactionService";
import { Search, Trash2 } from "lucide-react";
import { NavLink } from "react-router-dom";

const RiwayatPembelian = () => {
  const [history, setHistory] = useState([]);
  const [showRefund, setShowRefund] = useState(false);
  useEffect(() => {
    getMyHistoryDetail()
      .then((res) => setHistory(res))
      .catch(() => setHistory([]));
  }, []);

  return (
    <div className="w-full min-h-screen bg-[#dedede] flex flex-col items-center py-10">
      {/* ================= NAVBAR (TERPISAH) ================= */}
      <div className="w-full max-w-[1100px] bg-white rounded-2xl shadow mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 px-4 sm:px-6 py-4">
          <div className="flex gap-10 text-gray-700 font-medium">
            <ul className="flex flex-wrap gap-4 sm:space-x-6 font-medium text-gray-700">
              <NavLink
                to="/user/home"
                className={({ isActive }) =>
                  isActive
                    ? "text-[#43B573] font-semibold"
                    : "hover:text-green-600"
                }
              >
                Beranda
              </NavLink>

              <NavLink
                to="/berita-wisata"
                className={({ isActive }) =>
                  isActive
                    ? "text-[#43B573] font-semibold"
                    : "hover:text-green-600"
                }
              >
                Berita-Wisata
              </NavLink>

              <NavLink
                to="/kunjungan"
                className={({ isActive }) =>
                  isActive
                    ? "text-[#43B573] font-semibold"
                    : "hover:text-green-600"
                }
              >
                Kunjungan
              </NavLink>

              <NavLink
                to="/pembelian-tiket"
                className={({ isActive }) =>
                  isActive
                    ? "text-[#43B573] font-semibold"
                    : "hover:text-green-600"
                }
              >
                Pembelian-Tiket
              </NavLink>
            </ul>
          </div>

          {/* Search */}
          <div className="flex items-center bg-gray-100 px-4 py-2 rounded-full w-full sm:w-[250px]">
            <input
              type="text"
              placeholder="Cari Disini"
              className="flex-1 outline-none bg-transparent"
            />
            <Search size={18} className="text-gray-600" />
          </div>
        </div>
      </div>

      {/* ================= CARD CONTENT ================= */}
      <div className="w-full max-w-[1100px] bg-white rounded-2xl shadow">
        <div className="p-4 sm:p-6">
          {/* TITLE */}
          <h1 className="text-xl font-semibold mb-6">Riwayat Pembelian</h1>

          {/* TABS */}
          <div className="flex flex-wrap gap-3 sm:gap-6 mb-6">
            <button className="bg-[#4dbd74] text-white px-4 py-2 rounded-full">
              Semua
            </button>
            <button className="text-gray-700">Dibayar</button>
            <button className="text-gray-700">Dibatalkan</button>
            <button className="text-gray-700">Whislist</button>
          </div>

          {/* INFO BOX */}
          <div className="bg-gray-100 px-4 sm:px-6 py-3 rounded-xl flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-8">
            <p className="text-gray-700 text-sm">
              Kamu Telah memesan <b>9 Tiket wisata</b> dalam 1 Bulan terakhir
            </p>
            <Trash2 className="text-red-500 cursor-pointer" />
          </div>

          {/* LIST PEMBELIAN */}
          <div className="space-y-5">
            {history.map((item) => (
              <div
                key={item.id}
                className="bg-white p-4 rounded-xl shadow flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
              >
                <div className="flex items-center gap-4">
                  {/* IMAGE DUMMY (biar UI tetap rapi) */}
                  <div className="w-24 sm:w-28 h-20 bg-gray-200 rounded-xl"></div>

                  <div>
                    {/* KOTA */}
                    <h3 className="font-semibold">{item.location}</h3>

                    {/* KATEGORI */}
                    <p className="text-gray-600 text-sm mt-1">{item.type}</p>

                    {/* STATUS */}
                    <div className="flex items-center gap-2 mt-1">
                      <div className="w-3 h-3 bg-[#4dbd74] rounded-full"></div>
                      <span className="text-[#4dbd74] text-sm">
                        {item.status}
                      </span>
                    </div>
                  </div>
                </div>

                {/* HARGA */}
                <div className="flex sm:flex-col justify-between sm:items-end gap-2">
                  <p className="font-semibold text-gray-700">
                    Rp {Number(item.nominal).toLocaleString()}
                  </p>

                  <button className="text-[#4dbd74] text-sm underline">
                    Code QR
                  </button>

                  <button
                    onClick={() => setShowRefund(true)}
                    className="bg-[#4dbd74] text-white text-xs px-4 py-1 rounded-full hover:bg-green-600"
                  >
                    Refund
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ================= MODAL REFUND ================= */}
      {showRefund && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-[360px] rounded-2xl p-6 shadow-lg">
            <h2 className="text-lg font-semibold mb-1">
              Silahkan isi data untuk Refund
            </h2>
            <p className="text-sm text-gray-500 mb-4">
              Data keluhan lengkap akan disetujui admin
            </p>

            <div className="space-y-3">
              <input
                className="w-full bg-green-100 px-4 py-2 rounded-full outline-none"
                placeholder="Email"
              />
              <input
                className="w-full bg-green-100 px-4 py-2 rounded-full outline-none"
                placeholder="Keluhan"
              />
              <input
                className="w-full bg-green-100 px-4 py-2 rounded-full outline-none"
                placeholder="Total yang dibayarkan"
              />
              <input
                className="w-full bg-green-100 px-4 py-2 rounded-full outline-none"
                placeholder="Untuk wisata ke"
              />
            </div>

            <div className="flex justify-end gap-3 mt-5">
              <button
                onClick={() => setShowRefund(false)}
                className="bg-red-200 text-red-600 px-4 py-2 rounded-full text-sm"
              >
                Batalkan
              </button>
              <button className="bg-green-400 text-white px-4 py-2 rounded-full text-sm">
                Kirim
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RiwayatPembelian;
