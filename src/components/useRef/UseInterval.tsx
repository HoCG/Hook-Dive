import React, { useEffect, useRef, useState } from 'react';

//이때 useRef를 활용하면 인터벌로 인해 변하는 값을 정상적으로 반영시킬 수 있다.
//짜잔~ useRef를 통해 callback이라는 함수를 담고 있으면서 state를 정상적으로 바꿀 수 있게되었다.
//이런식으로 어떤 가변값을 유지해야한다면 useRef를 사용하면 된다.
const UseInterval: React.FC = () => {
  const [count, setCount] = useState(0);
  const savedCallback = useRef<any>(null);

  const callback = () => {
    setCount(count + 1);
  }

  useEffect(() => {
    savedCallback.current = callback;
  });

  useEffect(() => {
    const tick = () => {
      savedCallback.current();
    };
    let id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return <h1>{count}</h1>;
};

export default UseInterval;