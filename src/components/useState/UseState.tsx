import React, { useEffect, useState } from 'react';

const UseState: React.FC = () => {
  const [message, setMessage] = useState<string>('');
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    //state값이 변할때마다 화면이 리렌더링 된다. 따라서 정말 필요한 상황이 아니면 state의 사용을 남발하는건 좋지않다는 것.
    //비동기적 setter 실행.
    setMessage(e.target.value);
    //동기적 setter 실행.
    setMessage(() => {
      return e.target.value
    });
    //console.log()를 통해 보는건 실행 순서가 느려서 인지를 못하기 때문에 useEffect에 넣어서 보면 값이 변하는걸 바로바로 확인해볼 수 있다.
    console.log(message);
  };
  //이렇게.
  useEffect(() => {
    console.log(message);
  })
  return (
    <div>
      <input type="text" onChange={handleOnChange}/>
    </div>
  );
};

export default UseState;