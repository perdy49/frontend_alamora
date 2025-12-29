import React, { useEffect, useState } from "react";
import { ArrowLeft, Share2, User as UserIcon } from "lucide-react";
import { NavLink, useParams } from "react-router-dom";
import api from "../../services/api";
import { createTransaction } from "../../services/transactionService";

const DetailWisata = () => {
  const { id } = useParams(); // 🔑 ambil id dari URL
  const [event, setEvent] = useState(null);

  const [showOrder, setShowOrder] = useState(false);

  const [orderForm, setOrderForm] = useState({
    email: "",
    nominal: "",
    paid_date: "",
    metode: ""
  });


  useEffect(() => {
    api
      .get(`/events/${id}`)
      .then((res) => setEvent(res.data))
      .catch(() => setEvent(null));
  }, [id]);

  const handleBayar = async () => {
    try {
      // validasi sederhana
      if (
        !orderForm.email ||
        !orderForm.nominal ||
        !orderForm.paid_date ||
        !orderForm.metode
      ) {
        alert("Lengkapi semua data pembayaran");
        return;
      }

      await createTransaction({
        email: orderForm.email,
        nominal: orderForm.nominal,
        paid_date: orderForm.paid_date,
        metode: orderForm.metode,
        event_id: id
      });

      alert("Pembayaran berhasil");
      setShowOrder(false);
      window.location.href = "/pembelian-tiket";

    } catch (error) {
      alert("Gagal melakukan pembayaran");
    }
  };


  if (!event) {
    return <p className="text-center mt-20">Loading...</p>;
  }

  return (
    <div className="w-full min-h-screen bg-[#dedede] flex flex-col items-center py-10">
      {/* CONTAINER */}
      <div className="w-full max-w-[1100px] bg-white rounded-2xl shadow p-4 md:p-6">
        {/* IMAGE BANNER */}
        <div className="relative">
          {/* KEMBALI — SEKARANG MASUK BANNER ✅ */}
          <NavLink to="/user/home">
            <button
              className="
        absolute top-4 left-4 z-20
        flex items-center gap-2
        bg-white/80 backdrop-blur
        px-3 py-2 rounded-full
        text-gray-800
        hover:bg-white
      "
            >
              <ArrowLeft size={18} />
              <span className="text-sm font-medium">Kembali</span>
            </button>
          </NavLink>

          <img
            src={`http://localhost:5000/uploads/${event.image}`}
            className="w-full h-[420px] object-cover rounded-xl"
          />

          {/* CARD INFO WISATA */}
          <div className="absolute top-5 right-5 bg-white p-5 rounded-xl shadow-md w-[280px]">
            <div className="flex justify-between items-center mb-2">
              <h2 className="font-bold text-lg">{event.title}</h2>
              <Share2 size={20} className="text-gray-700 cursor-pointer" />
            </div>

            <p className="text-gray-700 text-sm leading-relaxed">
              {event.location}
            </p>

            <p className="mt-3 text-[#4dbd74] font-semibold">
              Rp {Number(event.price).toLocaleString()} / Orang
            </p>

            <button
              onClick={() => setShowOrder(true)}
              className="w-full mt-3 bg-[#4dbd74] text-white py-2 rounded-full"
            >
              Pesan Sekarang
            </button>

            <NavLink to="/pembelian-tiket">
              <button className="w-full mt-3 border border-[#4dbd74] text-[#4dbd74] py-2 rounded-full hover:bg-[#4dbd74] hover:text-white transition">
                Tambahkan ke Wishlist
              </button>
            </NavLink>
          </div>
        </div>

        {/* SECTION KOMENTAR + RATING */}
        <div className="w-full mt-10 flex flex-col md:flex-row gap-6">
          {/* KOMENTAR */}
          <div className="flex-1">
            <div className="flex gap-4 mb-4">
              <button className="bg-[#4dbd74] text-white px-4 py-2 rounded-full">
                Semua Komentar
              </button>
              <button className="text-gray-600 hover:text-black">
                Positif
              </button>
              <button className="text-gray-600 hover:text-black">
                Negative
              </button>
            </div>

            <div className="border rounded-xl p-4 bg-white flex items-start gap-3 mt-10">
              <UserIcon size={35} className="text-[#4dbd74]" />

              <div>
                <p className="text-sm text-gray-700 mb-2">User1@gmail.com</p>
                <p className="text-gray-700 leading-relaxed">
                  Website yang bagus, saya sekarang tidak perlu menunggu lama
                  untuk travel ke eropa. semoga website ini bisa terus
                  dikembangkan, serta beberapa fiturnya sudah berfungsi dengan
                  baik, segitu dulu dari saya.
                </p>
              </div>
            </div>
          </div>

          {/* RATING */}
          <div className="w-full md:w-[300px] border rounded-xl p-6 bg-white">
            <p className="font-semibold mb-2">Rating Keseluruhan :</p>
            <p className="text-[#4dbd74] text-4xl font-bold mb-4">4.9</p>
            <ul className="text-gray-700 space-y-2 text-sm">
              <li>* Alam yang indah</li>
              <li>* Transportasi yang bagus</li>
              <li>* Respon Cepat</li>
            </ul>
          </div>
        </div>
      </div>
      {showOrder && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-[90%] max-w-[420px] rounded-2xl p-6 shadow-xl">
            <h2 className="text-xl font-bold mb-4 text-center">
              Form Pemesanan
            </h2>

            {/* EMAIL */}
            <input
              type="email"
              placeholder="Email"
              value={orderForm.email}
              onChange={(e) =>
                setOrderForm({ ...orderForm, email: e.target.value })
              }
              className="w-full border rounded-lg px-4 py-2 mb-3"
            />

            {/* HARGA */}
            <select
              value={orderForm.nominal}
              onChange={(e) =>
                setOrderForm({ ...orderForm, nominal: e.target.value })
              }
              className="w-full border rounded-lg px-4 py-2 mb-4"
            >
              <option value="">Pilih Harga</option>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
                <option key={i} value={i * 1000000}>
                  Rp {(i * 1000000).toLocaleString()}
                </option>
              ))}
            </select>
            <input
              type="date"
              value={orderForm.paid_date}
              onChange={(e) =>
                setOrderForm({ ...orderForm, paid_date: e.target.value })
              }
              className="w-full border rounded-lg px-4 py-2 mb-3"
            />
            <select
              value={orderForm.metode}
              onChange={(e) =>
                setOrderForm({ ...orderForm, metode: e.target.value })
              }
              className="w-full border rounded-lg px-4 py-2 mb-4"
            >
              <option value="">Pilih Metode Pembayaran</option>
              <option value="Dana">Dana</option>
              <option value="Wallet">Wallet</option>
              <option value="Transfer">Transfer</option>
            </select>

            {/* BUTTON */}
            <div className="flex gap-3">
              <button
                onClick={handleBayar}
                className="flex-1 bg-[#4dbd74] text-white py-2 rounded-full"
              >
                Bayar
              </button>

              <button
                onClick={() => setShowOrder(false)}
                className="flex-1 border border-gray-400 text-gray-700 py-2 rounded-full"
              >
                Batalkan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailWisata;
