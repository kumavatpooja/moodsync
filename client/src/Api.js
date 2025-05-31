// src/api.js
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;


export const registerUser = (data) => axios.post(`${API_URL}/auth/register`, data);
export const loginUser = (data) => axios.post(`${API_URL}/auth/login`, data);
