import { ForwardedRef, forwardRef } from 'react';
import styled from 'styled-components';

const UseEffectDelayChild = ({}, ref: ForwardedRef<HTMLDivElement>) => {
  return (
    <ChildContainer ref={ref}>

    </ChildContainer>
  );
};

const ChildContainer = styled.div`
width: 30rem;
height: 30rem;
`;

export default forwardRef(UseEffectDelayChild);