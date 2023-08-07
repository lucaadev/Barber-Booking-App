import axios from 'axios';

const API_URL = 'https://f626-45-237-105-92.ngrok-free.app';

const api = axios.create({
  baseURL: API_URL,
});

export default api;