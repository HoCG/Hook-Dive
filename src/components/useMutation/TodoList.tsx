import React from 'react';

type todoType = {
  id: string;
  title: string;
  description: string;
};

type propType = {
  todo: todoType;
}

const TodoList = ({todo}: propType) => {
  return (
    <div>
      <h3>{todo.title}</h3>
      <p>{todo.description}</p>
    </div>
  );
};

export default TodoList;