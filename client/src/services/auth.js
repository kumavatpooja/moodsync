import API from "./api";

export const login = async (formData) => {
  const res = await API.post("/auth/login", formData);
  return res.data;
};

export const register = async (formData) => {
  const res = await API.post("/auth/register", formData);
  return res.data;
};
