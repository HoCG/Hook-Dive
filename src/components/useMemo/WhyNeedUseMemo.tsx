import React, { useEffect, useMemo, useState } from 'react';

const WhyNeedUseMemo = () => {
  /*
    useMemo가 왜 필요한지 제대로 보여줄 수 있는 사례를 하나 만들어보자.
    먼저 우리는 자바스크립트의 특성을 하나 알아야한다.
    {} === {}는 false다.
    { id: 0 } === { id: 0 }는 false다. 이게 놀랍게도 감동실화임.
    자 그럼 잘생각해보자.

    const [ name, setName ] = useState('');
    const [ age, setAge ] = useState('');
    const [ darkMode, setDarkMode ] = useState(false);
    const person = {
      age, name
    }
    useEffect(() => {
      console.log(person);
    }, [person]);

    이런게 있다고 치자. 이거 그럼 darkMode라는 값이 바뀔때마다 useEffect가 실행될까?
    진짜 개웃긴게 실행됨ㅋㅋㅋ 왜? person이라는 값이 새로 정의가 된다. 근데 위에 설명했듯이 객체 === 객체는 false다. 다른값으로 인지하기때문에 darkMode라는 값이 실행이 되더라도 리렌더링이
    되면서 person 값이 재정의되기 때문에 그지같이 리렌더링이 또 됨;;; 이걸 막기위해서 useMemo를 쓰는거다!!
  */  
  const [ name, setName ] = useState('');
  const [ age, setAge ] = useState('');
  const [ darkMode, setDarkMode ] = useState(false);
  const person = useMemo(() => {
    return { age, name }
    }, [age, name]
  );
  useEffect(() => {
    console.log(person);
  }, [person]);
  return (
    <div style={{background: darkMode ? "#333" : "#FFF"}}>
      
    </div>
  );
};

export default WhyNeedUseMemo;