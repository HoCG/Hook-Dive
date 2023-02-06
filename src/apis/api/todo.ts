import { todoAxios } from "../axios/todoAxios";

type postTodoType = {
  title: string;
  description: string;
};

const getTodos = () => {
  return todoAxios.get('/todo');
};

const postTodos = (todo: postTodoType) => {
  return todoAxios.post('/todo', {
    todo
  });
};

export { getTodos, postTodos };