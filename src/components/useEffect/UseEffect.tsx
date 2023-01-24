import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const UseEffect: React.FC = () => {
  const [count, setCount] = useState<number>(0);
  const [effectCounter, setEffectCounter] = useState<number>(0);
  useEffect(() => {

  });
  const handleOnClickIncrement = () => {
    setCount(count + 1);
  }
  const handleOnClickDecrement = () => {
    setCount(count + 1);
  }
  return (
    <ButtonContainer>
      
    </ButtonContainer>
  );
};

const ButtonContainer = styled.div`
width: 100vw;
height: 100vh;
display: grid;
place-items: center;
`;

export default UseEffect;