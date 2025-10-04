import API from "../api/axiosInstance";

export const getTasks = async (params) => {
  const res = await API.get("/tasks", { params });
  return res.data;
};

export const createTask = async (payload) => {
  const res = await API.post("/tasks", payload);
  return res.data;
};

export const updateTask = async (id, payload) => {
  const res = await API.put(`/tasks/${id}`, payload);
  return res.data;
};

export const deleteTask = async (id) => {
  const res = await API.delete(`/tasks/${id}`);
  return res.data;
};

export const getTaskById = async (id) => {
  const res = await API.get(`/tasks/${id}`);
  return res.data;
};
