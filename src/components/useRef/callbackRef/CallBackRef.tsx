import { useCallback } from 'react';
import CallBackRefChild from './CallBackRefChild';

const CallBackRef = () => {
  //짜잔~ 이렇게 useEffect와 useRef가 합쳐져서 동작이 가능해졌다~
  const childRef = useCallback((node: HTMLElement | null) => {
    if (node !== null) {
      node.style.backgroundColor = "black";
    }
  }, [])
  return (
    <div>
      <CallBackRefChild ref={childRef}></CallBackRefChild>
    </div>
  );
};

export default CallBackRef;