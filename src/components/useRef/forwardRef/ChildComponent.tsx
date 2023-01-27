import { ForwardedRef, forwardRef } from 'react';
import styled from 'styled-components';

type propsType = {};

/*
  여기서 크리티컬한 이슈를 하나 발견했다. React.FC를 사용할시 

    " 
    defaultProps 속성의 형식이 호환되지 않습니다. 
    'Partial<{}> | undefined' 형식은 'undefined' 형식에 할당할 수 없습니다. 
    'Partial<{}>' 형식은 'undefined' 형식에 할당할 수 없습니다.
    "

  이런 이상한 버그가 나오게 됐다는 점. 알아보니까 React.FC를 사용하면서 나오게 된 버그.
  🥚FC에서는 defaultProps기능을 제공하지않기에 터진 이슈였다!!!!
  🥚ref에서는 이미 defaultProps로 박혀서 데이터가 들어오는 모양인데 속성이 없다고 버그를 터트리는 모양!!!!
  React.FC를 생각해보면 너무 막무가내로 사용하고 있었다. 동작원리와 선언이유에 대해서 깊게 고찰해볼 필요성을 느낀 버그였다.
  한번 이 부분도 깊게 공부해보자.
*/
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