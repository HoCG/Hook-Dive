import React, { useReducer, useState, useRef } from 'react';
import styled from 'styled-components';
import TableElement from './TableElement';

type userType = {
  id: number,
  name: string,
  age: number,
  job: string
}

const initialUser = [
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
]

//이렇게 스테이트들에 대한 action들을 정의한다. 각 액션에는 reducer를 거치며 반환되는 스테이트 값도 정의해주자.
const reducer = (state: userType[], action: any): userType[] => {
  switch (action.type) {
    case 'ADD':
      return [...state, action.user];
    case 'DELETE':
      return [...state.filter(user => user.id !== action.user.id)];
    case 'UPDATE':
      return [...state.map(user=>
        user.id === action.user.id ? {
          id: action.user.id,
          name: action.user.name,
          age: action.user.age,
          job: action.user.job
        } : user
      )];
    default:
      return state;
  }
}

const UseReducer: React.FC = () => {
  //우리가 유저배열이 있는데 이값을 변화시켜주기 setter를 불러와 사용해야 할때가 있다.
  //근데 값이 바뀌어야 할때마다 계속 set~~~이걸 해준다? 무척 비효율적이다. 바로 이러한 상황을 방지하고자, useReducer를 사용하는거다. 자, 각설하고 한번 써보도록 하자.
  //useReducer는 dispatch를 통해 상태를 변화시킨다.
  const [users, dispatch] = useReducer(reducer, initialUser);
  const nameRef = useRef();
  const ageRef = useRef();
  const jobRef = useRef();
  const addUser = () => {
    //이렇게 dispatch에 대한 타입과 전달돼야하는 payload값을 정의하자.
    dispatch({
      type: "ADD",
      user: {
        id: users.length,
        name: nameRef.current.value,
        age: ageRef.current.value,
        job: jobRef.current.value
      }
    });
  };
  const deleteUser = (user: userType) => {
    dispatch({
      type: "DELETE",
      user: user
    });
  };
  return (
    <UseReducerContainer>
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
        <th>수정</th>
        {
          users.map(user => <TableElement deleteUser={deleteUser} key={user.name} user={user}></TableElement>)
        }
      </table>
    </UseReducerContainer>
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

const UseReducerContainer = styled.div`
width: 100%;
height: 100vh;
display: grid;
place-items: center;
`;

export default UseReducer;