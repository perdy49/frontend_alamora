import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

import api from "../../services/api";

export default function Dashboard() {
  const [jumlahUser, setJumlahUser] = useState(0);
  const [jumlahTransaksi, setJumlahTransaksi] = useState(0);
  const [jumlahEvent, setJumlahEvent] = useState(0);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [userRes, eventRes, trxRes] = await Promise.all([
          api.get("/users/count").catch(() => ({ data: 0 })),
          api.get("/events/count").catch(() => ({ data: 0 })),
          api.get("/transactions/count").catch(() => ({ data: 0 }))
        ]);

        setJumlahUser(userRes.data || 0);
        setJumlahEvent(eventRes.data || 0);
        setJumlahTransaksi(trxRes.data || 0);
      } catch (err) {
        console.error("Gagal load dashboard admin");
      }
    };

    fetchDashboardData();
  }, []);

  const prediksiUser = Math.round(jumlahUser * 1.15);
  const prediksiTransaksi = Math.round(jumlahTransaksi * 1.1);
  const prediksiEvent = Math.round(jumlahEvent * 1.12);

  return (
    <div className="p-4 md:p-6">
      {/* Greeting Header */}
      <div className="bg-green-500 text-white p-6 rounded-xl mb-6">
        <h2 className="text-lg md:text-xl font-bold">Selamat Malam Admin</h2>
        <p className="text-sm md:text-base">
          Lakukan Pemantauan dan pengerjaan data CRUD di website utama ini
        </p>
      </div>

      {/* Statistic Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-4 rounded-xl shadow">
          <p className="text-gray-600">Jumlah User Masuk</p>
          <h3 className="text-2xl font-bold">{jumlahUser}</h3>
        </div>

        <div className="bg-white p-4 md:p-5 rounded-xl shadow">
          <p className="text-gray-600">Jumlah Transaksi Uang</p>
          <h3 className="text-xl md:text-2xl font-bold">
            {jumlahTransaksi.toLocaleString()}
          </h3>
        </div>

        <div className="bg-white p-4 rounded-xl shadow">
          <p className="text-gray-600">Jumlah Event Tambahan</p>
          <h3 className="text-2xl font-bold">{jumlahEvent}</h3>
        </div>
      </div>

      {/* Charts Section */}
      <div className="bg-white p-6 rounded-xl shadow mb-6">
        <h3 className="text-base md:text-lg font-semibold mb-3">
          Prediksi Analisis
        </h3>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* BAR CHART */}
          <div className="bg-gray-100 p-4 rounded-lg min-h-[300px]">
            <p className="font-semibold mb-3">User & Transaksi</p>

            <div className="w-full h-[260px] md:h-56 bg-white rounded-lg shadow-inner p-2">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={[
                    {
                      name: "User",
                      sekarang: jumlahUser,
                      prediksi: prediksiUser
                    },
                    {
                      name: "Transaksi",
                      sekarang: jumlahTransaksi,
                      prediksi: prediksiTransaksi
                    }
                  ]}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="sekarang" fill="#16a34a" name="Sekarang" />
                  <Bar dataKey="prediksi" fill="#2563eb" name="Prediksi" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* PIE CHART */}
          <div className="bg-gray-100 p-4 rounded-lg min-h-[300px]">
            <p className="font-semibold mb-3">Pie Chart</p>

            <div className="w-full h-[260px] md:h-56 bg-white rounded-lg shadow-inner p-2 flex justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={[
                      { name: "Event Sekarang", value: jumlahEvent },
                      { name: "Prediksi Event", value: prediksiEvent }
                    ]}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                    label
                  >
                    <Cell fill="#16a34a" />
                    <Cell fill="#ef4444" />
                  </Pie>

                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
