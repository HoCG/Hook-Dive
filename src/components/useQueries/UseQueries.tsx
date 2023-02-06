import React, { useState } from 'react';
import { useQueries } from 'react-query';
import { getJokes } from '../../apis/api/joke';
import { getTodos } from '../../apis/api/todo';


const UseQueries = () => {
  const [getData, setGetData] = useState(false);
  //useQuery를 여러번 써서 데이터를 가지고오는 방법도 있겠지만 그건 너무 비효율적이잖아?
  //한번에 코드를 관리하는 방법을 원할때는 useQueries를 쓰는거다!
  const queriesData = useQueries([
    {
      queryKey: ["todo"],
      queryFn: () => getTodos()
    },
    {
      queryKey: ["joke", getData],
      queryFn: () => getJokes()
    }
  ]);
  const handleOnClick = () => {
    setGetData(!getData);
  };
  //각각의 api호출을 통해 가져온 값들을 관리할때는 아래와 같이 배열의 형태로 잡혀있다는 사실을 잊지말자!
  return (
    <div>
      <div>
        <div>
          {
            queriesData[0].data?.data[0].title
          }
        </div>
        <div>
          {
            queriesData[1].data?.data.value
          }
        </div>
        <div>
          <button onClick={handleOnClick}>클릭하기</button>
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default UseQueries;