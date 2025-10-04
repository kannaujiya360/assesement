import API from "../api/axiosInstance";

export const registerUser = async (payload) => {
  const res = await API.post("/auth/register", payload);
  return res.data;
};

export const loginUser = async (payload) => {
  const res = await API.post("/auth/login", payload);
  return res.data;
};
