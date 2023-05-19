import React, { useMemo, useRef, useState } from 'react';
import styled from 'styled-components';
import TableElement from './TableElement';

type userType = {
  id: number,
  name: string,
  age: number,
  job: string
}

const UseMemo: React.FC = () => {
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
  //주의!! 이렇게 input으로 값의 변화를 계속 인지해야할때는 그냥 useRef를 쓰는게 좋다. 왜냐하면 useState의 값이 변할때마다 계속해서 리렌더링이 일어나기 때문이다.
  //useRef의 경우는 리렌더링이 일어나지도 않기때문에 훨씬 효율적으로 input값을 관리할 수 있다.
  //근데 이자식... 타입스크립트로 사용할때 조금 까다롭다. DOM에 접근해야하는 상황에서는 useRef<HTMLInputElement>(null) as any; 값을 정의할때는 useRef<number>(0);로 사용하자.
  const nameRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const jobRef = useRef<HTMLInputElement>(null);
  //이렇게 useMemo를 적용시켜서 값을 계산해야하는 상황을 한정적으로 users라는 값이 변할때에만 바뀌도록 설정할 수 있다.
  const userCount = useMemo<number>(() => users.length, [users]);
  const addUser = () => {
    if(!nameRef.current || !ageRef.current || !jobRef.current ) {
      return;
    }
    setUsers([...users, {
      id: users.length,
      name: nameRef.current.value,
      age: parseInt(ageRef.current.value),
      job: jobRef.current.value
    }]);
  };
  return (
    <UseMemoContainer>
      <UserCreateForm>
        <input name='name' ref={nameRef}/>
        <input name='age' ref={ageRef} type='number'/>
        <input name='job' ref={jobRef}/>
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