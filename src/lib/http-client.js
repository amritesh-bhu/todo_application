import axios from 'axios';

export const httpClient = axios.create({
    baseURL: 'http://localhost:5001',
    timeout: 1000,
    withCredentials: true,
  });
  