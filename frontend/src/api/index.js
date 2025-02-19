import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const login = (credentials) => api.post('/login', credentials);
export const register = (userData) => api.post('/register', userData);