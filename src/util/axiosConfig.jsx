import axios from "axios";

export const baseUrl = "http://localhost:8080/api/v1.0";
// export const Deployurl = "https://money-manager-backend-7xc8.onrender.com/api/v1.0";

export const API_ENDPOINTS = {
  LOGIN: "/login",
  REGISTER: "/register",
};

const axiosConfig = axios.create({
  baseURL: baseUrl, 
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

const excludeEndpoints = ["/login", "/register", "/status", "/activate", "/health"];

axiosConfig.interceptors.request.use(
  (config) => {
    const shouldSkipToken = excludeEndpoints.some((endpoint) =>
      config.url?.includes(endpoint)
    );

    if (!shouldSkipToken) {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosConfig.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        // Unauthorized, redirect to login
        window.location.href = "/login";
      } else if (error.response.status === 500) {
        console.error("Server error. Please try again later.");
      }
    } else if (error.code === "ECONNABORTED") {
      console.error("Request timeout. Please try again.");
    }
    return Promise.reject(error);
  }
);

export default axiosConfig;
