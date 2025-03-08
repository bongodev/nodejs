import axios from 'axios';
import appConfig from './appConfig';

const http = axios.create({
  baseURL: appConfig.BASE_URL,
  headers: {
    'Content-type': 'application/json',
  },
});

http.interceptors.request.use((config) => {
  if (config.data instanceof FormData) {
    config.headers['Content-Type'] = 'multipart/form-data';
  }
  return config;
});

export default http;
