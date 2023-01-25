import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ChildMemo from './ChildMemo';

const Memo: React.FC = () => {
  const [count, setCount] = useState<number>(0);
  const handleOnClickIncrement = () => {
    setCount(count + 1);
  }
  const handleOnClickDecrement = () => {
    setCount(count - 1);
  }
  useEffect(() => {
    console.log("부모 리렌더링.");
  });
  return (
    <ButtonContainer>
      <CounterShower>부모의 카운트는 {count}입니다.</CounterShower>
      <ButtonBox>
        <DefaultButton onClick={handleOnClickIncrement}>+</DefaultButton>
        <DefaultButton onClick={handleOnClickDecrement}>-</DefaultButton>
      </ButtonBox>
      <ChildMemo></ChildMemo>
    </ButtonContainer>
  );
};

const CounterShower = styled.div`
display: grid;
place-items: center;
`;

const ButtonContainer = styled.div`
width: 100%;
height: 100%;
display: grid;
place-items: center;
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

const ButtonBox = styled.div`
width: 30vw;
height: 30vh;
background-color: wheat;
border-radius: 20px;
display: flex;
align-items: center;
justify-content: space-evenly;
flex-direction: row;
`;

export default Memo;