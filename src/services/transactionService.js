import api from "./api";

/**
 * USER - BAYAR
 */
export const createTransaction = async (data) => {
  const res = await api.post("/transactions", data);
  return res.data;
};

/**
 * USER - HISTORY
 */
export const getMyTransactions = async () => {
  const res = await api.get("/transactions/my");
  return res.data;
};

/**
 * ADMIN - SEMUA TRANSAKSI
 */
export const getAllTransactions = async () => {
  const res = await api.get("/transactions");
  return res.data;
};

/**
 * ADMIN - UPDATE STATUS
 */
export const updateTransactionStatus = async (id, status) => {
  const res = await api.put(`/transactions/${id}`, { status });
  return res.data;
};

export const deleteTransaction = async (id) => {
  const res = await api.delete(`/transactions/${id}`);
  return res.data;
};

/**
 * USER - HISTORY DETAIL (JOIN EVENTS)
 */
export const getMyHistoryDetail = async () => {
  const res = await api.get("/transactions/history");
  return res.data;
};
