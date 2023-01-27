import React, { useState, useLayoutEffect } from 'react';

type userType = {
  name: string,
  phoneNumber: string
}

const UseLayoutEffect = () => {
  const [buttonOn, setButtonOn] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<userType>({
    name: '',
    phoneNumber: ''
  });
  useLayoutEffect(() => {
    setUserInfo({
      name: "jose",
      phoneNumber: "0103333333"
    });
    setButtonOn(!buttonOn);
  }, []);
  const handleOnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setButtonOn(!buttonOn);
  }
  return (
    <div>
      <div>
        {
          buttonOn && `${userInfo.name} ${userInfo.phoneNumber}`
        }
      </div>
      {
        <button onClick={handleOnClick}>보이는 버튼</button>
      }
    </div>
  );
};

export default UseLayoutEffect;