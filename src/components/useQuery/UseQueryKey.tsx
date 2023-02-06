import React, { useEffect, useState } from 'react';
import { getTodos } from '../../apis/api/todo';
import { useQuery } from 'react-query';

type todoType = {
  id: string,
  title: string,
  description: string
}

type errorType = {
  message: string;
};

const UseQueryKey = () => {
  //실습을 통해 알았다. 키와 상태. 즉, ["todo", 데이터] 이렇게 값을 걸어두면 데이터값이 변할때 useQuery를 통해 api통신을 다시하게 된다!
  //이경우 주의해야할 사항. 리렌더링이 발생한다. 성능고려를 해서 배열의 값을 뭘 넣을지 고민해보도록 하자.
  const [isOn, setIsOn] = useState<boolean>(false);
  const { data } = useQuery(["todo", isOn], getTodos, {
    refetchOnWindowFocus: false, // react-query는 사용자가 사용하는 윈도우가 다른 곳을 갔다가 다시 화면으로 돌아오면 이 함수를 재실행한다. 그 재실행 여부 옵션이다.
    retry: 0, // 실패시 재호출 몇번 할지
    onSuccess: data => {
      console.log(data);
    },
    onError: (e: errorType) => {
      console.log(e.message);
    }
  });
  useEffect(() => {
    console.log("리렌더링 발생!");
  });
  const handleOnClick = () => {
    setIsOn(!isOn);
  };
  return (
    <div>
      <div>
        {
          data?.data.map((todo: todoType) => 
          <div>
            <h1>{todo.title}</h1>
            <h1>{todo.description}</h1>
          </div>)
        }
      </div>
      <button onClick={handleOnClick}>클릭하기</button>
    </div>
  );
};

export default UseQueryKey;