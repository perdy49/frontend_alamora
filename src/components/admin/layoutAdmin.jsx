import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import {
  Menu,
  X,
  Home,
  Users,
  CreditCard,
  Calendar,
  LogOut,
  Bell,
  Mail
} from "lucide-react";

import logo1 from "../../assets/Images/logo1.png";
import logo2 from "../../assets/Images/foto-profile1.jpg";

export default function AdminLayout() {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/admin/login");
  };

  return (
    <div className="w-full min-h-screen bg-gray-100">
      {/* ================= SIDEBAR ================= */}
      <div
        className={`fixed top-0 left-0 z-30 h-screen bg-green-600 text-white p-6 transition-all duration-300
          ${
            open
              ? "w-64 translate-x-0"
              : "w-20 md:translate-x-0 -translate-x-full"
          }
        `}
      >
        {/* LOGO */}
        <div className="flex items-center gap-3 mb-8">
          <img
            src={logo1}
            alt="Logo"
            className="w-10 h-10 rounded-xl object-cover"
          />
          {open && <h1 className="text-2xl font-semibold">Alamora</h1>}
        </div>

        {/* MENU */}
        <nav className="flex flex-col gap-4">
          <button
            onClick={() => navigate("/admin/dashboard")}
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-green-700"
          >
            <Home />
            {open && "Dashboard"}
          </button>

          <button
            onClick={() => navigate("/admin/event")}
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-green-700"
          >
            <Calendar />
            {open && "CRUD Event"}
          </button>

          <button
            onClick={() => navigate("/admin/transaksi")}
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-green-700"
          >
            <CreditCard />
            {open && "Transaksi"}
          </button>

          <button
            onClick={() => navigate("/admin/crud_user")}
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-green-700"
          >
            <Users />
            {open && "CRUD User"}
          </button>
        </nav>

        {/* LOGOUT */}
        <div className="absolute bottom-6 left-0 right-0 px-6">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-green-700 w-full"
          >
            <LogOut />
            {open && "Logout"}
          </button>
        </div>
      </div>

      {/* OVERLAY (MOBILE) */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-20 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* ================= MAIN AREA ================= */}
      <div
        className={`transition-all duration-300 min-h-screen
          ${open ? "md:ml-64 ml-0" : "md:ml-20 ml-0"}
        `}
      >
        {/* ================= NAVBAR ================= */}
        <div className="sticky top-0 z-10 bg-white shadow px-4 py-3 flex items-center justify-between">
          {/* LEFT */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setOpen(!open)}
              className="p-2 rounded-lg bg-green-600 text-white"
            >
              {open ? <X /> : <Menu />}
            </button>

            {/* LOGO MOBILE */}
            <div className="md:hidden flex items-center gap-2">
              <img
                src={logo1}
                alt="Logo"
                className="w-7 h-7 rounded-md object-cover"
              />
              <span className="font-semibold text-green-600">Alamora</span>
            </div>
          </div>

          {/* CENTER (DESKTOP SEARCH) */}
          <input
            type="text"
            placeholder="Cari Disini"
            className="hidden md:block border px-3 py-2 rounded-lg w-[280px] lg:w-[360px]"
          />

          {/* RIGHT */}
          <div className="flex items-center gap-4">
            {/* MOBILE */}
            <button className="md:hidden">
              <Bell className="w-6 h-6 text-green-600" />
            </button>

            <div className="md:hidden">
              <img
                src={logo2}
                alt="Admin"
                className="w-8 h-8 rounded-full object-cover"
              />
            </div>

            {/* DESKTOP */}
            <div className="hidden md:flex items-center gap-5">
              <button>
                <Bell className="w-6 h-6 text-green-600" />
              </button>

              <button>
                <Mail className="w-6 h-6 text-green-600" />
              </button>

              <div className="flex items-center gap-2">
                <img
                  src={logo2}
                  alt="Admin"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <span className="font-semibold">Admin</span>
              </div>
            </div>
          </div>
        </div>

        {/* ================= PAGE CONTENT ================= */}
        <div className="p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
