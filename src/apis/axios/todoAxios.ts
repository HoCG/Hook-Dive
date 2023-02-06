import axios from 'axios';

const todoAxios = axios.create({
  baseURL: import.meta.env.VITE_REACT_APP_TODO_API_URL,
  withCredentials: true,
});

export { todoAxios };