import React, { useEffect, useRef, useState } from 'react';

/*
useState를 인터벌을 통해 계속 변경시켜줘야 할때가 있다.
문제는 useState를 아래와같이 작성시 setInterval이 정상적으로 state변경을 시켜주질 못한다. 
  const [count, setCount] = useState(0);
  useEffect(() => {
      const timer = setInterval(() => {
        setCount(count + 1);
      }, 1000);
      return () => clearInterval(timer);
  }, []);
계속해서 첫 렌더의 state값을 담고있기 때문이다.
???: 이거 그냥 useEffect뒤 배열에 count 넣어서 해결 가능한거 아님?
이라고 할 수 있는데 결론부터 말하면 위험한 발상이다. 이 경우, 계속해서 setInterval함수가 선언되면서 count 값이 바뀌는 것처럼 보이는 거다. 
즉, setInterval이 계속 남아있는게 아니라는 것.
*/
const UseRefForSetData: React.FC = () => {
  const [count, setCount] = useState(0);
  useEffect(() => {
      const timer = setInterval(() => {
        setCount(count + 1);
      }, 1000);
      return () => clearInterval(timer);
  }, [count]);
  return (
    <>
      {
        count
      }
    </>
  )
};

export default UseRefForSetData;