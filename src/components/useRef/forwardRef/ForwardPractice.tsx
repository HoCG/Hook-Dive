import React, { useEffect, useRef } from 'react';
import ForwardPracticeChild from './ForwardPracticeChild';

const ForwardPractice = () => {
  const colorRef = useRef<HTMLDivElement>(null);  
  useEffect(() => {
    console.log("부모 리렌더링");
  });
  const handleOnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const current = colorRef.current;
    if(current) {
      current.style.backgroundColor = "orange";
    }
  }
  return (
    <div>
      <button onClick={handleOnClick}>색변경</button>
      <ForwardPracticeChild ref={colorRef}></ForwardPracticeChild>
    </div>
  );
};

export default ForwardPractice;