import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const UseEffect: React.FC = () => {
  const [count, setCount] = useState<number>(0);
  //스테이트의 값이 변할때마다 자연스럽게 useEffect가 동작하게 된다. 그리고 화면이 마운트, 언마운트 되는 시점에서 실행된다는 점.
  //useEffect뒤에 배열을 넣어줄 수가 있다. 빈배열의 경우 마운트가 되는 시점에만, 그리고 배열안에 값을 넣으면 넣은 값이 변경될때에만 useEffect가 실행되도록 할 수 있다.
  //useEffect안에 return을 두는 경우는 unMount의 효과를 기대할 수 있다.
  useEffect(() => {
    console.log(count);
  });
  const handleOnClickIncrement = () => {
    setCount(count + 1);
  }
  const handleOnClickDecrement = () => {
    setCount(count - 1);
  }
  const handleOnClickNull = () => {
    console.log('nullButton실행');
  }
  return (
    <ButtonContainer>
      <CounterShower>
        <h1>현재 카운터는 {count}입니다.</h1>
      </CounterShower>
      <ButtonBox>
        <DefaultButton onClick={handleOnClickIncrement}>+</DefaultButton>
        <DefaultButton onClick={handleOnClickDecrement}>-</DefaultButton>
        <DefaultButton onClick={handleOnClickNull}>null</DefaultButton>
      </ButtonBox>
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

export default UseEffect;