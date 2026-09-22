import axios from "axios";

const API_URL = (
  process.env.REACT_APP_API_URL ||
  "https://vishnu18-event-booking.onrender.com"
).replace(/\/$/, "");

const api = axios.create({
  baseURL: `${API_URL}/V1/api`,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export { API_URL };

export default api;