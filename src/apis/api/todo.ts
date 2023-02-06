import { todoAxios } from "../axios/todoAxios";

const getTodos = () => {
  return todoAxios.get('/todo');
};

export { getTodos };