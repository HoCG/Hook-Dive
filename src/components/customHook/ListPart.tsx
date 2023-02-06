import React, { useEffect } from 'react';
import List from './List';

type todoType = {
  id: string;
  title: string;
  description: string;
};

type propType = {
  todoList: todoType[]
}

const ListPart = ({todoList}: propType) => {
  useEffect(() => {
    console.log(todoList);
  })
  return (
    <div>
      {
        todoList && (todoList.map((todo: todoType) => {
          return <List key={todo.id} todo={todo}></List>
        }))
      }
    </div>
  );
};

export default ListPart;