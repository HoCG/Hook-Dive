import React, { useEffect, useRef, useState } from 'react';
import ChildComponent from './ChildComponent';

const ForwardRef: React.FC = () => {
  const [reRender, setReRender] = useState<Boolean>(false);
  /*
    forwardRef 이거 언제 사용하는걸까? 바로 커스텀 input같은걸 만들어서 쓸 때.
    부모에서 자식의 input변화를 감지할때 state쓰는건 말도 안되잖아? 그래서 쓰는거임!
  */
  const customRef = useRef<HTMLInputElement>(null);
  const handleOnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setReRender(!reRender);
    e.preventDefault();
  };
  useEffect(() => {
    console.log("리렌더링!", customRef.current?.value);
  });
  return (
    <div>
      <ChildComponent ref={customRef}></ChildComponent>
      <button onClick={handleOnClick}>리렌더링</button>
    </div>
  );
};

export default ForwardRef;