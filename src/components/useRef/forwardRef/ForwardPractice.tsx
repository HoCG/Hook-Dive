import React, { useRef } from 'react';
import ForwardPracticeChild from './ForwardPracticeChild';

const ForwardPractice = () => {
  const colorRef = useRef<HTMLDivElement>(null);
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