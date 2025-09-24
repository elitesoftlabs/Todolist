import axios from "axios";

const API_URL = "http://localhost:5000/api";

// ✅ Axios will include cookies automatically
axios.defaults.withCredentials = true;

export const login = async (username, password) => {
  return axios.post(`${API_URL}/login`, { username, password });
};

export const logout = async () => {
  return axios.post(`${API_URL}/logout`);
};
