import React, { useEffect, useRef } from 'react';

const UseRef: React.FC = () => {
  const inputRef = useRef<HTMLInputElement>(null) as any;
  //이게 딱 마운트되는 시점에서만 실행됨. 개꿀ㅋㅋ
  useEffect(() => {
    console.log("run");
  });
  //이걸로 알 수 있는 사실 클릭 이벤트는 리렌더링에 영향을 주지 않는다는 점.
  const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log(inputRef.current.value);
  }
  return (
    <div>
      {
        /*
          다음과 같이 inputRef를 ref로 걸어주면 DOM접근이 가능하다. 이때 리렌더링을 발생시키지 않는다.
        */
      }
      <input type="text" ref={inputRef}/>
      <button onClick={onClick}>확인하기</button>
    </div>
  );
};

export default UseRef;