// src/pages/admin/CrudUser.jsx
import React, { useEffect, useState } from "react";
import { getUsers, deleteUser } from "../../services/userService";

const CrudUser = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    const data = await getUsers();
    setUsers(data || []);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Yakin hapus user ini?")) return;
    await deleteUser(id);
    fetchUsers();
  };

  return (
    <div className="p-6 w-full">
      {/* TOP FILTERS */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
        <button className="px-4 py-2 bg-green-600 text-white rounded-lg shadow-sm hover:bg-green-700 transition">
          {users.length} Orang ▼
        </button>

        <button className="px-4 py-2 bg-green-600 text-white rounded-lg shadow-sm hover:bg-green-700 transition">
          Data Pribadi ▼
        </button>
      </div>

      {/* MAIN CARD */}
      <div className="bg-gray-200 w-full p-6 rounded-xl shadow-inner">
        {users.map((u) => (
          <div
            key={u.id}
            className="bg-white p-4 rounded-xl shadow flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-4"
          >
            {/* User Data */}
            <div className="space-y-1">
              <p className="font-semibold text-gray-800">{u.username}</p>
              <p className="text-gray-600">{u.email}</p>
            </div>

            {/* BUTTONS */}
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <button className="px-4 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition w-full sm:w-auto">
                Edit
              </button>

              <button
                onClick={() => handleDelete(u.id)}
                className="px-4 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition w-full sm:w-auto"
              >
                Hapus
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CrudUser;
