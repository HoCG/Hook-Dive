import { useRef } from 'react';
import { useTodoQuery } from './UseTodoQuery';

const InputPart = (() => {
  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const { todoMutation } = useTodoQuery(titleRef.current?.value, descriptionRef.current?.value);
  return (
    <div>
      <input ref={titleRef} type="text" />
      <div>
        <textarea ref={descriptionRef}/>
      </div>
      <div>
        <button onClick={() => todoMutation.mutate()}>등록하기</button>
      </div>
    </div>
  );
});

export default InputPart;