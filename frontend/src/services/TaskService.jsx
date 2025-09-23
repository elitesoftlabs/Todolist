import axios from "axios";
import { getToken } from "./AuthServices";

const API_URL = "http://localhost:5000/api/tasks";

const authHeader = () => ({
  headers: { Authorization: `Bearer ${getToken()}` }
});

export const getTasks = () => axios.get(API_URL, authHeader());
export const addTask = (task) => axios.post(API_URL, task, authHeader());
export const updateTask = (id, task) => axios.put(`${API_URL}/${id}`, task, authHeader());
export const deleteTask = (id) => axios.delete(`${API_URL}/${id}`, authHeader());
