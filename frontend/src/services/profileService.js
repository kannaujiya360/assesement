import API from "../api/axiosInstance";

export const fetchProfile = async () => {
  const res = await API.get("/profile");
  return res.data;
};

export const updateProfile = async (payload) => {
  const res = await API.put("/profile", payload);
  return res.data;
};
