import { ForwardedRef, forwardRef } from 'react';
import styled from 'styled-components';

type propsType = {};

const ChildComponent = ({}, ref: ForwardedRef<HTMLInputElement>) => {
  return (
    <>
      <CustomInput ref={ref}></CustomInput>
    </>
  );
};

const CustomInput = styled.input`
border-radius: 20px;
height: 3rem;
`;

export default forwardRef<HTMLInputElement, propsType>(ChildComponent);