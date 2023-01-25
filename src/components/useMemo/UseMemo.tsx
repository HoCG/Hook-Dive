import React, { useMemo, useState } from 'react';
import styled from 'styled-components';
import TableElement from './TableElement';

type userType = {
  id: number,
  name: string,
  age: number,
  job: string
}

const UseMemo = () => {
  const [newUser, setNewUser] = useState<userType>({
    id: 0,
    name: '',
    age: 0,
    job: ''
  });
  const [users, setUsers] = useState<userType[]>([
    {
      id: 0,
      name: 'jaehun',
      age: 24,
      job: 'programmer'
    }, {
      id: 1,
      name: 'minjun',
      age: 27,
      job: 'programmer'
    }, {
      id: 2,
      name: 'kyunho',
      age: 28,
      job: 'programmer'
    }, {
      id: 3,
      name: 'dongjae',
      age: 24,
      job: 'programmer'
    }
  ]);
  //
  const userCount = useMemo(() => users.length, [users]);
  const handleChangeNewUser = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewUser({
      ...newUser,
      [e.target.name]: e.target.value,
    });
  };
  const addUser = () => {
    setUsers([...users, newUser])
  }
  return (
    <UseMemoContainer>
      <UserCreateForm>
        <input name='name' onChange={handleChangeNewUser}/>
        <input name='age' type='number' onChange={handleChangeNewUser}/>
        <input name='job' onChange={handleChangeNewUser}/>
        <button onClick={addUser}>등록</button>
      </UserCreateForm>
      <table border={1}>
        <th>유저 아이디</th>
        <th>유저 이름</th>
        <th>나이</th>
        <th>직업</th>
        {
          users.map(user => <TableElement user={user}></TableElement>)
        }
      </table>
      <h1>사용자 수: {userCount}</h1>
    </UseMemoContainer>
  );
};

const UserCreateForm = styled.div`
display: grid;
place-items: center;
background-color: orange;
width: 20rem;
height: 10rem;
border-radius: 20px;
`;

const UseMemoContainer = styled.div`
width: 100%;
height: 100vh;
display: grid;
place-items: center;
`;

export default UseMemo;