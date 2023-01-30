import { useEffect, useRef } from 'react';
import UseEffectDelayChild from './UseEffectDelayChild';

const UseEffectDelay = () => {
  const childRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (childRef.current) {
      childRef.current.style.backgroundColor = "black";
    }
  });
  return (
    <div>
      <UseEffectDelayChild ref={childRef}></UseEffectDelayChild>
    </div>
  );
};

export default UseEffectDelay;