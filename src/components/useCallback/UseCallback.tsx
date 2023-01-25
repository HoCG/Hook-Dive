import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { getJokes } from '../../apis/api/joke';

type userInfoType = {
  name: string,
  age: number,
  phoneNumber: string
};

const UseCallback: React.FC = () => {
  const [count, setCount] = useState<number>(0);
  let user: userInfoType = {
    name: '',
    age: 0,
    phoneNumber: ''
  };
  const [userInfo, setUserInfo] = useState<userInfoType>({
    name: '',
    age: 0,
    phoneNumber: ''
  });
  const handleOnClickIncrement = () => {
    setCount(count + 1);
  }
  const handleOnClickDecrement = () => {
    setCount(count - 1);
  }
  const handleOnClickUserInfoUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInfo({...user, [e.target.name]: e.target.value});
  }
  const handleSetUser = () => {
    setUserInfo(user);
    console.log(userInfo);
  }
  const [jokes, setJokes] = useState<string>('');
  const fetchJoke = useCallback(() => 
    getJokes()
    .then(res => {
      setJokes(res.data.value);
    }), [userInfo]);
  useEffect(() => {
    fetchJoke();
  }, []);
  return (
    <UseCallbackContainer>
      <ShowJokes>{ jokes }</ShowJokes>
      <SetUserInfoBox>
        <input onChange={handleOnClickUserInfoUpdate} type="text" name='name'/>
        <input onChange={handleOnClickUserInfoUpdate} type="number" name='age'/>
        <input onChange={handleOnClickUserInfoUpdate} type="text" name='phoneNumber'/>
        <UpdateUserButton onClick={handleSetUser}>유저정보 수정</UpdateUserButton>
      </SetUserInfoBox>
      <SetCounter>
        <DefaultButton onClick={handleOnClickIncrement}>+</DefaultButton>
        <h1>{count}</h1>
        <DefaultButton onClick={handleOnClickDecrement}>-</DefaultButton>
      </SetCounter>
    </UseCallbackContainer>
  );
};

const UseCallbackContainer = styled.div`
width: 100%;
height: 100vh;
display: grid;
place-items: center;
`;

const ShowJokes = styled.div`
width: 20rem;
height: 15rem;
border-radius: 20px;
background-color: orange;
`;

const SetUserInfoBox = styled.div`
width: 30rem;
height: 20rem;
background-color: purple;
`;

const SetCounter = styled.div`
width: 30rem;
height: 20rem;
background-color: wheat;
display: flex;
align-items: center;
justify-content: space-evenly;
flex-direction: row;
`;

const DefaultButton = styled.div`
font-size: larger;
font-weight: 900;
background-color: white;
width: 3rem;
height: 2rem;
text-align: center;
border-radius: 20px;
user-select: none;
cursor: pointer;
`;

const UpdateUserButton = styled.div`
font-size: larger;
font-weight: 900;
background-color: white;
width: 12rem;
height: 2rem;
text-align: center;
border-radius: 20px;
user-select: none;
cursor: pointer;
`;

export default UseCallback;