import axios from "axios";

// For Create React App
const baseURL = "http://localhost:8000/api";

// Create custom axios instance
const api = axios.create({
  baseURL, // e.g., 'http://localhost:8000/api'
  timeout: 300000,
  headers: {
    "Content-Type": "application/json",
    // Add any default headers here
  },
});

// Add request interceptor
api.interceptors.request.use(
  (config) => {
    // Get token from localStorage or wherever you store it
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle errors (e.g., 401 Unauthorized)
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem("token");
      // Redirect to login or show error
    }
    return Promise.reject(error);
  }
);

export default api;
