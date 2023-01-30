import React, { ForwardedRef, forwardRef } from 'react';
import styled from 'styled-components';

const CallBackRefChild = ({}, ref: ForwardedRef<HTMLDivElement>) => {
  return (
    <ChildContainer ref={ref}>
    </ChildContainer>
  );
};

const ChildContainer = styled.div`
width: 20rem;
height: 20rem;
box-shadow: 0 6px 6px 0 gray;
`;

export default forwardRef(CallBackRefChild);