import React, { useId, useRef, useState } from 'react';
import IdChild from './IdChild';

type user = {
  id: string;
  name: string;
  age: number;
};

const UseId = () => {
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
