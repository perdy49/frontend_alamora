import api from "./api";

// USER
export const getPublicNews = async () => {
  const res = await api.get("/news");
  return res.data;
};

// ADMIN
export const getAllNews = async () => {
  const res = await api.get("/news/admin/all");
  return res.data;
};

export const createNews = async (data) => {
  const res = await api.post("/news", data, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });
  return res.data;
};

export const updateNews = async (id, data) => {
  const res = await api.put(`/news/${id}`, data, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });
  return res.data;
};

export const deleteNews = async (id) => {
  const res = await api.delete(`/news/${id}`);
  return res.data;
};
