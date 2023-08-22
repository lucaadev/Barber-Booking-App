import axios from 'axios';
import { EXPO_PUBLIC_URL } from '@env';

const API_URL = EXPO_PUBLIC_URL;

const api = axios.create({
  baseURL: API_URL,
});

export default api;