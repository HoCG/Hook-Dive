import React from 'react';

type userType = {
  id: number,
  name: string,
  age: number,
  job: string
}

type propsType = {
  user: userType
}

const TableElement: React.FC<propsType> = ({user}) => {
  return (
    <tr>
      <td>{user.id}</td>
      <td>{user.name}</td>
      <td>{user.age}</td>
      <td>{user.job}</td>
    </tr>
  );
};

export default TableElement;