import axios from 'axios';

const API_URL = 'https://37f4-45-237-105-212.ngrok-free.app';

const api = axios.create({
  baseURL: API_URL,
});

export default api;