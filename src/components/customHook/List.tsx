import React, { ForwardedRef, forwardRef, MutableRefObject } from 'react';

type todoType = {
  id: string;
  title: string;
  description: string;
};

type propType = {
  todo: todoType
}

const List = ({todo}: propType) => {
  return (
    <div>
      <div>
        {
          todo.title
        }
      </div>
      <div>
        {
          todo.description
        }
      </div>
    </div>
  );
};

export default List;