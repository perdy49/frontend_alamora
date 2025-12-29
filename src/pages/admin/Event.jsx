import { useEffect, useState } from "react";
import {
  getAllNews,
  createNews,
  updateNews,
  deleteNews
} from "../../services/newsService";

import {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent
} from "../../services/eventService";

export default function CrudEventPage() {
  const [events, setEvents] = useState([]);
  const [newsEditingId, setNewsEditingId] = useState(null);
  const [newsImagePreview, setNewsImagePreview] = useState(null);
  // === NEWS STATE (BARU) ===
  const [news, setNews] = useState([]);
  const [newsForm, setNewsForm] = useState({
    title: "",
    description: "",
    category: "lokal",
    year: "",
    image: null
  });
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showNewsForm, setShowNewsForm] = useState(false); // ✅ TAMBAHKAN INI
  const [editingId, setEditingId] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [activeTab, setActiveTab] = useState("product");

  const [form, setForm] = useState({
    title: "",
    location: "",
    price: "",
    image: null,
    type: "populer"
  });

  const fetchEvents = async () => {
    const data = await getEvents();
    setEvents(data || []);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  useEffect(() => {
    if (activeTab === "news") {
      fetchNews();
    }
  }, [activeTab]);

  // ✅ EDIT EVENT
  const handleEdit = (e) => {
    setForm({
      title: e.title,
      location: e.location,
      price: e.price,
      image: null,
      type: e.type || "populer"
    });

    if (e.image) {
      setImagePreview(`http://localhost:5000/uploads/${e.image}`);
    } else {
      setImagePreview(null);
    }
    setEditingId(e.id);
    setShowForm(true);
  };

  // ✅ DELETE EVENT
  const handleDelete = async (id) => {
    if (!window.confirm("Hapus event ini?")) return;
    await deleteEvent(id);
    fetchEvents();
  };

  // ✅ CREATE / UPDATE
  const handleSave = async () => {
    if (!form.title || !form.location || !form.price) return;

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("location", form.location);
    formData.append("price", form.price);
    formData.append("type", form.type);

    if (form.image) {
      formData.append("image", form.image);
    }

    setLoading(true);

    try {
      if (editingId) {
        await updateEvent(editingId, formData);
      } else {
        await createEvent(formData);
      }

      setShowForm(false);
      setEditingId(null);
      fetchEvents();
      setImagePreview(null);

      setForm({
        title: "",
        location: "",
        price: "",
        image: null,
        type: "populer"
      });
    } finally {
      setLoading(false);
      setShowConfirm(false); // ✅ tutup modal
    }
  };

  // ================= FETCH NEWS =================
const fetchNews = async () => {
  const data = await getAllNews();
  setNews(data || []);
};

// ================= SAVE NEWS =================
const handleSaveNews = async () => {
  if (!newsForm.title || !newsForm.description || !newsForm.year) return;

  const formData = new FormData();
  formData.append("title", newsForm.title);
  formData.append("description", newsForm.description);
  formData.append("category", newsForm.category);
  formData.append("year", newsForm.year);

  if (newsForm.image) {
    formData.append("image", newsForm.image);
  }

  try {
    if (newsEditingId) {
      await updateNews(newsEditingId, formData);
    } else {
      await createNews(formData);
    }

    setNewsForm({
      title: "",
      description: "",
      category: "lokal",
      year: "",
      image: null
    });

    setNewsEditingId(null);
    setNewsImagePreview(null);
    setShowNewsForm(false);
    fetchNews();

    alert("News berhasil disimpan ✅");
  } catch (err) {
    console.error(err);
    alert("Gagal menyimpan news ❌");
  }
};

// ================= DELETE NEWS =================
const handleDeleteNews = async (id) => {
  if (!window.confirm("Hapus news ini?")) return;
  await deleteNews(id);
  fetchNews();
};


  return (
    <div className="flex w-full min-h-screen bg-gray-100">
      <div className="flex-1 p-6">
        {/* HEADER */}
        <div className="flex flex-col gap-4 mb-6">
          <h1 className="text-xl font-semibold">Panel Admin</h1>

          <div className="flex gap-4">
            <button
              onClick={() => {
                setActiveTab("product");
                setShowForm(false);
              }}
              className={`px-4 py-2 rounded-full ${
                activeTab === "product" ? "bg-green-500 text-white" : "border"
              }`}
            >
              Kelola Product
            </button>

            <button
              onClick={() => {
                setActiveTab("news");
                setShowForm(false);
              }}
              className={`px-4 py-2 rounded-full ${
                activeTab === "news" ? "bg-green-500 text-white" : "border"
              }`}
            >
              Kelola News
            </button>
          </div>

          {activeTab === "news" && (
            <button
              onClick={() => {
                setShowNewsForm(!showNewsForm);
                setNewsImagePreview(null);
                setNewsForm({
                  title: "",
                  description: "",
                  category: "lokal",
                  year: "",
                  image: null
                });
              }}
              className="w-fit px-4 py-2 bg-blue-500 text-white rounded-full shadow"
            >
              {showNewsForm ? "Tutup Form News" : "Tambah News"}
            </button>
          )}

          {/* TOMBOL TAMBAH EVENT */}
          {activeTab === "product" && (
            <button
              onClick={() => {
                setShowForm(!showForm);
                setEditingId(null);
                setImagePreview(null);
                setForm({
                  title: "",
                  location: "",
                  price: "",
                  image: null,
                  type: "populer"
                });
              }}
              className="w-fit px-4 py-2 bg-green-500 text-white rounded-full shadow"
            >
              {showForm ? "Tutup Form" : "Tambah Product"}
            </button>
          )}
        </div>

        {/* FORM */}
        {activeTab === "product" && showForm && (
          <div className="bg-white p-4 rounded-xl shadow mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                placeholder="Nama Event"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="border p-2 rounded"
              />
              <input
                placeholder="Kota"
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
                className="border p-2 rounded col-span-1 md:col-span-2"
              />
              <select
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                className="border p-2 rounded col-span-1 md:col-span-2"
              >
                <option value="">Pilih Harga</option>
                {Array.from({ length: 10 }).map((_, i) => (
                  <option key={i} value={(i + 1) * 1000000}>
                    Rp {(i + 1).toLocaleString()} Juta
                  </option>
                ))}
              </select>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (!file) return;

                  setForm({ ...form, image: file });
                  setImagePreview(URL.createObjectURL(file));
                }}
                className="border p-2 rounded col-span-2"
              />
              <select
                value={form.type}
                onChange={(e) => setForm({ ...form, type: e.target.value })}
                className="border p-2 rounded col-span-2"
              >
                <option value="rekomendasi">Rekomendasi Wisata</option>
                <option value="lainnya">Tempat Lainnya</option>
                <option value="populer">Wisata Populer</option>
              </select>
            </div>

            <div className="flex items-center gap-4 mt-4">
              {imagePreview && (
                <img
                  src={imagePreview}
                  className="w-24 h-24 rounded object-cover border"
                />
              )}
              <button
                onClick={() => setShowConfirm(true)}
                disabled={loading}
                className="px-4 py-2 bg-green-500 text-white rounded-lg"
              >
                {loading
                  ? "Menyimpan..."
                  : editingId
                  ? "Update Event"
                  : "Simpan Event"}
              </button>
            </div>
          </div>
        )}

        {activeTab === "news" && showNewsForm && (
          <div className="bg-white p-4 rounded-xl shadow mb-6">
            <div className="grid grid-cols-1 gap-4">
              <input
                placeholder="Judul News"
                value={newsForm.title}
                onChange={(e) =>
                  setNewsForm({ ...newsForm, title: e.target.value })
                }
                className="border p-2 rounded"
              />

              <textarea
                placeholder="Deskripsi"
                value={newsForm.description}
                onChange={(e) =>
                  setNewsForm({ ...newsForm, description: e.target.value })
                }
                className="border p-2 rounded"
              />

              <select
                value={newsForm.category}
                onChange={(e) =>
                  setNewsForm({ ...newsForm, category: e.target.value })
                }
                className="border p-2 rounded"
              >
                <option value="lokal">Lokal</option>
                <option value="nasional">Nasional</option>
                <option value="internasional">Internasional</option>
              </select>

              <input
                placeholder="Tahun"
                value={newsForm.year}
                onChange={(e) =>
                  setNewsForm({ ...newsForm, year: e.target.value })
                }
                className="border p-2 rounded"
              />

              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (!file) return;

                  setNewsForm({ ...newsForm, image: file });
                  setNewsImagePreview(URL.createObjectURL(file));
                }}
                className="border p-2 rounded"
              />
            </div>

            {newsImagePreview && (
              <img
                src={newsImagePreview}
                className="w-24 h-24 mt-4 rounded object-cover"
              />
            )}

            <button
              onClick={handleSaveNews}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
            >
              Simpan News
            </button>
          </div>
        )}

        {/* LIST EVENT */}
        {activeTab === "product" && (
          <div className="bg-white p-4 rounded-xl shadow">
            {events.length === 0 ? (
              <p className="text-center text-gray-500 py-10">Belum ada event</p>
            ) : (
              events.map((event) => (
                <div
                  key={event.id}
                  className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b py-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    {event.image && (
                      <img
                        src={`http://localhost:5000/uploads/${event.image}`}
                        className="w-full sm:w-24 h-40 sm:h-24 rounded object-cover"
                      />
                    )}
                    <div>
                      <p className="font-medium">{event.title}</p>
                      <p className="text-sm text-gray-500">
                        {event.location} • <b>{event.type}</b>
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                    <p className="text-green-600 font-medium">
                      Rp {event.price?.toLocaleString()}
                    </p>
                    <button
                      onClick={() => handleEdit(event)}
                      className="px-3 py-1 text-sm bg-yellow-400 rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(event.id)}
                      className="px-3 py-1 text-sm bg-red-500 text-white rounded"
                    >
                      Hapus
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === "news" && (
          <div className="bg-white p-4 rounded-xl shadow">
            {news.length === 0 ? (
              <p className="text-center text-gray-500 py-10">Belum ada news</p>
            ) : (
              news.map((n) => (
                <div
                  key={n.id}
                  className="flex justify-between items-center border-b py-4"
                >
                  <div>
                    <p className="font-medium">{n.title}</p>
                    <p className="text-sm text-gray-500">
                      {n.category} • {n.year}
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setNewsForm({
                          title: n.title,
                          description: n.description,
                          category: n.category,
                          year: n.year,
                          image: null
                        });
                        setNewsEditingId(n.id);
                        setShowNewsForm(true);
                      }}
                      className="px-3 py-1 text-sm bg-yellow-400 rounded"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDeleteNews(n.id)}
                      className="px-3 py-1 text-sm bg-red-500 text-white rounded"
                    >
                      Hapus
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
      {showConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-sm p-6">
            <h2 className="text-lg font-semibold mb-2">Konfirmasi</h2>
            <p className="text-gray-600 mb-6">
              Yakin ingin {editingId ? "update" : "simpan"} event ini?
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowConfirm(false)}
                className="px-4 py-2 rounded-lg border"
              >
                Batal
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-green-500 text-white rounded-lg"
              >
                Ya, Simpan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
