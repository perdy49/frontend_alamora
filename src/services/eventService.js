import api from "./api";

// 🔑 ambil base backend URL (tanpa /api)
const BASE_BACKEND_URL = import.meta.env.VITE_API_URL.replace("/api", "");

export const getEvents = async () => {
  const res = await api.get("/events");
  return res.data;
};

export const getPublicEvents = async () => {
  const res = await api.get("/events/public");

  return res.data.map((event) => ({
    ...event,
    image: event.image ? `${BASE_BACKEND_URL}/uploads/${event.image}` : null
  }));
};

export const createEvent = async (data) => {
  const res = await api.post("/events", data, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });
  return res.data;
};

export const updateEvent = async (id, data) => {
  const res = await api.put(`/events/${id}`, data, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });
  return res.data;
};

export const deleteEvent = async (id) => {
  const res = await api.delete(`/events/${id}`);
  return res.data;
};
