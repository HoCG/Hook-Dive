import React, { memo, useEffect, useState } from 'react';
import styled from 'styled-components';

const ChildMemo: React.FC = () => {
  const [count, setCount] = useState<number>(0);
  const handleOnClickIncrement = () => {
    setCount(count + 1);
  }
  const handleOnClickDecrement = () => {
    setCount(count - 1);
  }
  //여기서 알 수 있는 점은 자식컴포넌트가 리렌더링이 되더라도 부모컴포넌트가 리렌더링 되지 않는다.
  //이 때문에 컴포넌트화를 많이 해두는게 좋은 것임!!
  useEffect(() => {
    console.log("자식 컴포넌트 리렌더링.")
  })
  return (
    <>
      <CounterShower>자식의 카운트는 {count}입니다.</CounterShower>
      <ButtonBox>
        <DefaultButton onClick={handleOnClickIncrement}>+</DefaultButton>
        <DefaultButton onClick={handleOnClickDecrement}>-</DefaultButton>
      </ButtonBox>
    </>
  );
};

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

const CounterShower = styled.div`
display: grid;
place-items: center;
`;

const ButtonBox = styled.div`
width: 15vw;
height: 15vh;
background-color: purple;
border-radius: 20px;
display: flex;
align-items: center;
justify-content: space-evenly;
flex-direction: row;
`;

//이렇게 자식 컴포넌트에 memo를 적용시킨다면 부모가 리렌더링 될때 자식이 리렌더링되는 현상을 
//방지할 수 있다.
export default memo(ChildMemo);