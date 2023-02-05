import React, { useId, useRef, useState } from 'react';
import IdChild from './IdChild';

type user = {
  id: string;
  name: string;
  age: number;
};

const UseId = () => {
  //useId를 통해 고유의 값을 생성시킬 수 있다. 이를 기반으로 key를 지정할때에 피로를 덜어낼 수 있으며 좀 더 백엔드 친화적인
  //Id값을 생성시킬 수 있다는 장점이 있다!
  const [userInfo, setUserInfo] = useState<user[]>([
    {
      id: useId(),
      name: 'koko',
      age: 23,
    },
    {
      id: useId(),
      name: 'jojo',
      age: 23,
    },
    {
      id: useId(),
      name: 'meay',
      age: 23,
    },
  ]);
  return (
    <div>
      <div>useID</div>
      {
        userInfo.map(user =>
          <IdChild key={user.id} user={user}></IdChild>)
      }
    </div>
  );
};

export default UseId;
