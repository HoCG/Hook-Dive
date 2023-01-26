# Hook-Dive
숨참고 훅 다이브🤿


## 훅이란

Hook은 함수 컴포넌트에서 React state와 생명주기 기능(lifecycle features)을 “연동(hook into)“할 수 있게 해주는 함수다. 

## useState
useState는 컴포넌트 내부에서 사용될 상태값을 정의할때 쓴다. 상태란 컴포넌트의 변경가능한 데이터 저장소이다. 여기서 재밌는 점은 useState로 정의한 상태값이 변할 때마다 화면에 리렌더링이 일어난다는 것이다. 즉, 불필요한 state 사용은 잦은 리렌더링을 유발할 수 있다. 이러한 문제를 해결하기위해 아래 후술할 훅들을 통해 상태를 관리하면 더 좋을 것이다.

useState의 setState를 함수형으로 선언하는것과 그냥 선언하는건 어떤 차이가 있을까?

-일반형으로 선언하면 setState가 비동기적으로 실행된다.

-함수형으로 선언하면 setState가 동기적으로 실행된다.

## useEffect
스테이트의 값이 변할때마다, 그리고 넘겨받은 props값이 변경될 때마다 useEffect가 동작하게 된다. 그리고 화면이 마운트, 언마운트 되는 시점에서 실행된다. useEffect뒤에 배열을 넣어줄 수가 있는데 빈배열의 경우 마운트가 되는 시점에만, 배열안에 값을 넣으면 넣은 값이 변경될때에만 useEffect가 실행되도록 할 수 있다. useEffect안에 return을 두는 경우는 unMount의 효과를 기대할 수 있다. unMount기능활용 예시는 인터벌이 있다. 인터벌을 계속 지정해둔 경우 clean을 해줄때까지 동작을 하게된다. 이런 문제를 방지하고자 unMount시에 clean을 할 수 있도록 해준다.

## useReducer
위에 useEffect를 쓰다가 문득 그런생각이 들때가 있을 것이다. "set~~~함수를 통해 상태 수정시 복잡한 상태변화를 반복적으로 해야 하는가?"라는 것. 물론 setter가 정의된 영역의 함수화를 통해 문제를 해결할 수 있지만 state를 위해서 따로 함수를 만들고 state관리를 돕는다? 그건 합리적이지 못하다는 생각이 든다. 이 의문을 해결하기 위해서 우리는 useReducer라는 훅을 사용할것이다. 정말정말 쉽게 해당 훅을 묘사해보자면 로컬 state 전용 redux이다. useReducer와 redux의 코드가 정말 비슷하게 생겼기 때문이다. 각 action에 따른 switch case를 정의하고 리턴되는 값을 정의한다. 이때 정말 좋은점은 다양한 경우를 고려해서 값을 만들어낼 수 있다는 점이다. create, update, delete, read 모두 구현이 가능하다. 그리고 이로인해 코드를 좀 더 직관적이게 만들어 줄 수 있다는 점이 엄청난 장점이라고 본다. 이게 내겐 굉장한 매력으로 와 닿았다!

근데 이런생각도 할 수 있을 듯하다. 그냥 리덕스쓰면 되는거 아닌가? 라는 생각인데 리덕스는 엄밀히 전역 상태관리 라이브러리이며 꼭 필요한 상황이 아니라면 사용을 자중하는게 좋다. (다양한 전역상태를 계속 생각해주면서 개발에 임하기에는 머리가 너무 아프기 때문. 우리가 전역변수 사용을 자제하는 이유를 생각해보자.) 근데 로컬 상태값들을 관리만 하면 되지만 리덕스처럼 다양하게 상태변화를 주고싶다면 과감히 useReducer를 사용해보자아아


## useMemo

useEffect안에 리렌더링이 될때마다 특정 값을 계속해서 바꿔줘야하는 상황이 있을텐데, 만약 특정값을 계산하는게 무척 복잡하고 시간복잡도를 많이 잡아먹는다고 가정해보자. 이 경우 useEffect가 실행될때마다 계산이 이루어져야하기 때문에 시간복잡도가 높은 연산을 계속 실행하게 된다. 이 상황을 방지하고자 특정값이 변할때에만 리렌더링되길 바란다? 이때에는 바로 useMemo를 통해 성능 최적화를 해보자. useMemo는 메모리상에 계산되어야하는 값을 저장해두고 특정 값이 바뀔때에만 실행되도록 만들 수 있다.

useMemo가 리렌더링으로부터 자유롭다는 특성은 활용요소가 많은데 구체적인 예시를 하나 들어볼까 한다. 아래와 같은 코드가 하나 있다고 치자.



    const [ name, setName ] = useState('');
    const [ age, setAge ] = useState('');
    const [ darkMode, setDarkMode ] = useState(false);
    const person = {
      age, name
    }
    useEffect(() => {
      console.log(person);
    }, [person]);
    
    
만약 다크모드라는 상태가 바뀔때 useEffect가 실행될까? 놀랍게도 실행된다. 왜 바뀔까? 이 원인을 파악하려면 자바스크립트의 특성을 하나 이해해야한다. 

    {} === {}
    
어떤 결과가 나올까? 놀랍게도 false다. 진짜임. 당장 콘솔 열어서 해봐도 좋다. 또 하나 비교해보자.

    { id: 0 } === { id: 0 }
    
이건 결과가 어찌될까? 또 false다. 왜 그럴까? 자바스크립트는 A = B; B = C; A === C; 이런식으로 비교하는게 아니라면 객체는 무조건 다른 값이다라고 생각한다. 따라서 darkMode의 상태가 변할때마다 person이 새롭게 정의되고 person이라는 값이 아무리 기존값과 동일하다지만 위에 특성때문에 person === person은 false를 뱉게 되는거다. 이때 useMemo를 사용하는 것이다.

      const person = useMemo(() => {
        return { age, name }
        }, [age, name]
      );
      useEffect(() => {
        console.log(person);
      }, [person]);

위와 같이 person을 정의하게 된다면 어떻게 될까? 메모리상에 person이라는 정보를 계속 담고있기 때문에 아무리 다크모드의 상태가 변해서 리렌더링이 된다한들, 메모리상에 담겨있는 person이라는 정보는 바뀌지 않는 것이다. 리렌더링으로 인해 굳이 실행되지않아도 될 useEffect의 사용을 줄일 수 있는 것이다.
    
자 그리고 memo도 한번 알아보자. 우리가 일반적으로 생각해봤을때 자식 컴포넌트의 리렌더링이 일어난다면 부모는 당연히 리렌더링이 발생하지 않는다. 그러나 부모가 리렌더링이 발생시 자식도 리렌더링이 발생하게 되는데 특정상황에서 자식과 부모가 독립적으로 렌더가 되길 바란다면 이는 비효율적인 방식이라고 결론이 난다. 우리는 그래서 memo를 통해서 이러한 상황을 방지할 수 있다. memo를 React에서 import한 후에 자식컴포넌트를 감싸도록 한다면, 부모의 리렌더링이 일어나는 시점에서 자식의 리렌더링을 막을 수 있는 것이다.

이렇게 훌륭한 useMemo와 memo도 문제점이 하나있는데 바로 메모리를 차지한다는 점이다. 이 일련의 과정들은 메모리상에 값과 컴포넌트를 저장했기에 일어난 것이다. 따라서 반드시 useMemo, memo를 써야하는 상황에서만 사용하도록 하자.


## useCallback

useCallback도 useMemo와 비슷하다. 특정값이 변한다면 useCallback내부에 선언해둔 함수가 실행되도록 할 수 있다. useCallback의 경우는 특히 묵직한 api통신의 경우에 실행되게 하는게 이상적이라고 생각한다. api통신을 useEffect내에 호출하게 된다면 매 렌더링 시점마다 api통신 함수가 동작하게 될것이다. 이는 애플리케이션 성능을 떨어트리는 결정적 원인을 제공하기에 useCallback을 통해 callback뒤에 배열내부에 정의한 값이 바뀌는게 아니라면 호출되지 않도록 하는게 이상적이다. 단, useCallback 역시 useMemo와 동일한 문제점을 가지고있기 때문에 사용해서 소프트웨어의 성능을 보장할 수 있는 상황에서만 사용하길 바란다.

## useRef

기록을 안남기면 무조건 후회할거같아서 미리 작성해본다. input값을 change를 통해 setState의 동작을 기반으로 감지하는건 매우매우 비효율적인 행동이다. 계속해서 리렌더링을 반복하기 때문에 애플리케이션 성능을 상당히 저하시킬 수 있다. 이러한 단점을 극복하고자 useRef를 사용한다. useRef를 사용해 DOM접근시 리렌더링을 하지않는다. 

## useContext

## useQuery

## useMutation

## customHook


# Hook-Dive 후기
