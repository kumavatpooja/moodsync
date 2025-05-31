// src/services/authService.js (or wherever you keep auth API calls)
import API from "./api";

// Login function: send formData to /auth/login and return data
export const login = async (formData) => {
  try {
    const res = await API.post("/auth/login", formData);
    return res.data;
  } catch (error) {
    // Throw error so caller can handle it
    throw error.response?.data || error;
  }
};

// Register function: send formData to /auth/register and return data
export const register = async (formData) => {
  try {
    const res = await API.post("/auth/register", formData);
    return res.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};
