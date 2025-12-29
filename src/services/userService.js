import api from "./api";

/* ================= ADMIN ================= */

// ambil semua user (admin)
export const getUsers = async () => {
  const res = await api.get("/admin/users");
  return res.data;
};

// hapus user (admin)
export const deleteUser = async (id) => {
  const res = await api.delete(`/admin/users/${id}`);
  return res.data;
};

/* ================= USER ================= */

// ambil profile user login
export const getMyProfile = async () => {
  const res = await api.get("/users/me");
  return res.data;
};

// update profile user
export const updateMyProfile = async (data) => {
  const res = await api.put("/users/me", data);
  return res.data;
};
