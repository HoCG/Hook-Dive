import React from 'react';

type userType = {
  id: number,
  name: string,
  age: number,
  job: string
}

type propsType = {
  user: userType,
  deleteUser: (user: userType) => void
}

const TableElement: React.FC<propsType> = ({user, deleteUser}) => {
  return (
    <tr>
      <td>
        {user.id}
      </td>
      <td>
        {user.name}
      </td>
      <td>
        {user.age}
      </td>
      <td>
        {user.job}
      </td>
      <td>
        <button onClick={() => deleteUser(user)}>삭제</button>
      </td>
    </tr>
  );
};

export default TableElement;