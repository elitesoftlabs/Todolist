import axios from "axios";

const API_URL = "http://localhost:5000/api";

export const login = async (username, password) => {
  const res = await axios.post(`${API_URL}/login`, { username, password });
  if (res.data.token) {
    localStorage.setItem("token", res.data.token);
  }
  return res.data;
};

export const logout = () => {
  localStorage.removeItem("token");
};

export const getToken = () => localStorage.getItem("token");
