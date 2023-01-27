import { ForwardedRef, forwardRef } from 'react';
import styled from 'styled-components';


//forwardRef를 사용할때에는 이렇게 앞에 {}를 작성해주자구.
const ForwardPracticeChild = ({}, ref: ForwardedRef<HTMLDivElement>) => {
  return (
    <ForwardPracticeChildContainer ref={ref}>
    </ForwardPracticeChildContainer>
  );
};

//방금 알게된 사실: 스타일드 컴포넌트로 기술된 스타일들은 ref로 style을 재설정하더라도 
//사라지거나 초기화되지 않는다.
const ForwardPracticeChildContainer = styled.div`
width: 20rem;
height: 20rem;
background-color: black;
`;

export default forwardRef(ForwardPracticeChild);