import { Routes, Route, Navigate } from "react-router-dom";

// ADMIN
import AdminLogin from "./pages/admin/Login";
import LayoutAdmin from "./components/admin/layoutAdmin";
import Dashboard from "./pages/admin/Dashboard";
import CrudEventPage from "./pages/admin/Event";
import DataKeuangan from "./pages/admin/DataKeuangan";
import CrudUser from "./pages/admin/KelolaUser";

// USER
import Login from "./pages/user/Login_User";
import Register from "./pages/user/Register";
import Home from "./pages/user/Home";
import BeritaWisata from "./pages/user/News";
import Kunjungan from "./pages/user/Product";
import PembelianTiket from "./pages/user/History";
import Profile from "./pages/user/Profile"
import Detail from "./pages/user/Detail"

function App() {
  return (
    <Routes>
      {/* Redirect default */}
      <Route path="/" element={<Navigate to="/user/login" />} />

      {/* USER */}
      <Route path="/user/login" element={<Login />} />
      <Route path="/user/register" element={<Register />} />
      <Route path="/user/home" element={<Home />} />

      {/* MENU USER */}
      <Route path="/berita-wisata" element={<BeritaWisata />} />
      <Route path="/kunjungan" element={<Kunjungan />} />
      <Route path="/pembelian-tiket" element={<PembelianTiket />} />
      <Route path="/Profile" element={<Profile />} />
      <Route path="/detail/:id" element={<Detail />} />

      {/* ADMIN LOGIN */}
      <Route path="/admin/login" element={<AdminLogin />} />

      {/* ADMIN LAYOUT */}
      <Route path="/admin" element={<LayoutAdmin />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="event" element={<CrudEventPage />} />
        <Route path="transaksi" element={<DataKeuangan />} />
        <Route path="crud_user" element={<CrudUser />} />
      </Route>
    </Routes>
  );
}

export default App;
