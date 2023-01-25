import axios from 'axios';

const customAxios = axios.create({
  baseURL: import.meta.env.VITE_REACT_APP_API_URL
});

export { customAxios };