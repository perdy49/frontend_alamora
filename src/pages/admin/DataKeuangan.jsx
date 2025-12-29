import { useEffect, useState } from "react";
import {
  getAllTransactions,
  deleteTransaction
} from "../../services/transactionService";

export default function DataKeuangan() {
  const [transactions, setTransactions] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];

  const hargaList = [
    { label: "Harga Diskon", harga: "2 JT / Orang", canEdit: true },
    { label: "Paket Spesial", harga: "8 JT / Keluarga", canEdit: true },
    { label: "Harga Normal", harga: "5 JT / Orang", canEdit: true },
    { label: "Premium Class", harga: "15 JT / Orang", canEdit: false }
  ];

  useEffect(() => {
    getAllTransactions()
      .then((data) => setTransactions(data || []))
      .catch(() => setTransactions([]));
  }, []);

  const formatTanggal = (date) => {
    return new Date(date).toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "long",
      year: "numeric"
    });
  };

  const filteredTransactions = transactions.filter((t) => {
    const month = new Date(t.paid_date).getMonth();
    return month === selectedMonth;
  });

  const handleDelete = async (id) => {
    const ok = window.confirm("Yakin ingin dikembalikan dana?");
    if (!ok) return;

    await deleteTransaction(id);

    // refresh data
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <div className="p-6">
      {/* Header */}
      <h1 className="text-xl sm:text-2xl font-bold">Transaksi Keuangan</h1>
      <p className="text-gray-600 mb-6">
        Kejujuran harus selalu di utamakan ya
      </p>

      {/* Harga Section (TIDAK DIUBAH) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8 mt-4">
        {hargaList.map((item, i) => (
          <div
            key={i}
            className="bg-white p-4 rounded-xl shadow text-center space-y-2"
          >
            <p className="font-semibold">{item.label}</p>
            <h2 className="text-xl font-bold">{item.harga}</h2>

            {item.canEdit ? (
              <button className="px-4 py-2 bg-green-500 text-white rounded-full shadow w-full sm:w-auto">
                Rubah Harga
              </button>
            ) : (
              <p className="text-gray-500 text-sm">
                Tidak diperbolehkan merubah
              </p>
            )}
          </div>
        ))}
      </div>

      {/* Laporan Header */}
      <h2 className="text-lg font-semibold mb-2">
        Laporan Transaksi Keuangan dari User
      </h2>

      {/* Dropdown Bulan (UI TETAP) */}
      <div className="bg-white p-4 rounded-xl shadow mb-6">
        <select
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(Number(e.target.value))}
          className="w-full font-semibold outline-none bg-transparent"
        >
          {months.map((month, index) => (
            <option key={index} value={index}>
              Data Bulan {month}
            </option>
          ))}
        </select>
      </div>

      {/* List Transaksi */}
      <div className="space-y-4">
        {filteredTransactions.length === 0 ? (
          <p className="text-gray-500 text-center">
            Tidak ada transaksi di bulan ini
          </p>
        ) : (
          filteredTransactions.map((data) => (
            <div
              key={data.id}
              className="bg-white p-4 rounded-xl shadow flex flex-col md:flex-row md:justify-between md:items-center gap-4"
            >
              <div>
                <p className="font-medium">{data.email}</p>

                {/* 🔁 DARI JENIS → NOMINAL */}
                <p className="text-sm text-green-600">
                  Rp {Number(data.nominal).toLocaleString("id-ID")}
                </p>

                <p className="text-sm text-gray-500">
                  {formatTanggal(data.paid_date)}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                <span className="px-4 py-1 bg-green-500 text-white rounded-full font-medium w-fit">
                  {data.metode}
                </span>

                <button
                  onClick={() => handleDelete(data.id)}
                  className="px-4 py-2 bg-gray-200 rounded-full hover:bg-gray-300 shadow w-full sm:w-auto"
                >
                  Kembalikan
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
