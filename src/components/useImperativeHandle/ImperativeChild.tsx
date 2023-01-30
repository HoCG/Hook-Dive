import React, { ForwardedRef, forwardRef, useImperativeHandle, useRef, useState } from 'react';
import styled from 'styled-components';

type userType = {
  id: string,
  name: string,
  phoneNumber: string,
}

//useImperativeHandle을 통해 정의될 함수들의 타입을 정의한다.
export type refType = {
  setUser: (userName: string, phoneNumber: string) => void,
  setDivStyle: (width: string, height: string, color: string) => void,
} | null

const initUser = {
  id: '',
  name: '',
  phoneNumber: ''
}

const ImperativeChild = ({}: any, ref: React.Ref<refType> | undefined) => {
  const [user, setUser] = useState<userType>(initUser);
  const divRef = useRef<HTMLDivElement>(null);
  //아래와 같이 함수들을 정의.
  useImperativeHandle(ref, () => ({
    setUser (userName: string, phoneNumber: string) {
      setUser({
        ...user,
        name: userName,
        phoneNumber: phoneNumber
      });
    },
    setDivStyle (width: string, height: string, color: string) {
      if(divRef.current) {
        divRef.current.style.width = width;
        divRef.current.style.height = height;
        divRef.current.style.backgroundColor = color;
      }
    }
  }));
  return (
    <ImperativeChildContainer ref={divRef}>
      <div>
        {
          user.name
        }
      </div>
      <div>
        {
          user.phoneNumber
        }
      </div>
    </ImperativeChildContainer>
  );
};

const ImperativeChildContainer = styled.div`
width: 20rem;
height: 20rem;
box-shadow: 0 10px 10px 0 gray;
display: grid;
place-items: center;
`;

export default forwardRef(ImperativeChild);