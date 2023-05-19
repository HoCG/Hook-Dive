import { useRef } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { getTodos, postTodos } from '../../apis/api/todo';
import TodoList from './TodoList';

type errorType = {
  message: string;
};

type todoType = {
  id: string;
  title: string;
  description: string;
};

type postTodoType = {
  title: string;
  description: string;
};

const UseMutation = () => {
  //Ref를 통해 value값을 가져오도록 하자~
  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const queryClient = useQueryClient();
  //데이터 GET에대한 리액트 쿼리 훅을 선언해둔다.
  //음... 이때 쿼리키를 constants폴더에 넣고 관리해보는건 어떨까?
  const { data } = useQuery(["todo"], getTodos, {
    refetchOnWindowFocus: false, // react-query는 사용자가 사용하는 윈도우가 다른 곳을 갔다가 다시 화면으로 돌아오면 이 함수를 재실행한다. 그 재실행 여부 옵션이다.
    retry: 0, // 실패시 재호출 몇번 할지
    onSuccess: data => {
      console.log(data);
    },
    onError: (e: errorType) => {
      console.log(e.message);
    }
  });
  //GET이 아닌 POST, DELETE와 같은 메소드를 실행할때 사용하는 리액트 쿼리 훅이다.
  const todoMutation = useMutation(() => postTodos({
    title: titleRef.current?.value,
    description: descriptionRef.current?.value
  } as postTodoType), {
    onSuccess: () => {
      //이렇게하면 진짜 좋은점: todo로 정한 유니크 키값이 변했으므로 자연스럽게
      //데이터를 GET해온다. 너무 아름답다...!!!!!!! 그저 하염없이 눈물만...주륵주륵...
      //오늘 이걸 알았기때문에 앞으로는 리액트 쿼리만 쓸듯하다. 리덕스 썽크는 세이굿바이.
      queryClient.invalidateQueries("todo");
    }
  });
  return (
    <div>
      <h2>글 작성</h2>
      <div>
        <input ref={titleRef} type="text" />
      </div>
      <div>
        <textarea ref={descriptionRef} />
      </div>
      <div>
        <button onClick={() => todoMutation.mutate()}>등록하기</button>
      </div>
      <div>
        {
          data?.data.map((element: todoType) => 
          <TodoList key={element.id} todo={element}></TodoList>)
        }
      </div>
    </div>
  );
};

export default UseMutation;