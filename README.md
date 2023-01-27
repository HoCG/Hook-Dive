# Hook-Dive
숨참고 훅 다이브🤿


## 훅이란

Hook은 함수 컴포넌트에서 React state와 생명주기 기능(lifecycle features)을 “연동(hook into)“할 수 있게 해주는 함수다. 

## useState
useState는 컴포넌트에서 사용될 상태값을 정의할때 쓴다. 상태란 컴포넌트의 변경가능한 데이터이다. 여기서 재밌는 점은 useState로 정의한 상태값이 변할 때마다 화면에 리렌더링이 일어난다는 것이다. 즉, 불필요한 state 사용은 잦은 리렌더링을 유발할 수 있다. 이러한 문제를 해결하기위해 아래 후술할 훅들을 통해 상태를 관리하면 더 좋을 것이다.

useState의 setState를 함수형으로 선언하는것과 그냥 선언하는건 어떤 차이가 있을까?

-일반형으로 선언하면 setState가 비동기적으로 실행된다.

-함수형으로 선언하면 setState가 동기적으로 실행된다.

## useEffect
스테이트의 값이 변할때마다, 그리고 부모로 부터 넘겨받은 props값이 변경될 때마다 useEffect가 동작하게 된다. 그리고 화면이 마운트, 언마운트 되는 시점에서 실행된다. useEffect뒤에 배열을 넣어줄 수 가 있는데 빈 배열의 경우 마운트가 되는 시점에서, 배열안에 값을 넣으면 넣은 값이 변경되는 시점에서 useEffect가 실행된다. useEffect안에 return을 두는 경우는 unMount의 효과가 있다. unMount기능활용 예시는 인터벌이 있다. 인터벌을 계속 지정해둔 경우 clean을 해줄때까지 동작을 하게된다. 이런 문제를 방지하고자 unMount시에 clean을 할 수 있도록 해준다.

## useReducer
setState를 통해 상태 수정시 복잡한 상태변화를 반복적으로 해야 한다면 useReducer를 사용하는게 좋다. 물론 setState가 정의된 영역의 함수화를 통해 문제를 해결할 수 있지만 state를 위해서 따로 함수를 만들어서 state관리를 돕는다? 그건 합리적이지 못하다. 이러한 이유로 우리는 useReducer라는 훅을 사용할 것이다. 정말 쉽게 useReducer를 밀해보자면 로컬 state 전용 redux다. useReducer와 redux의 코드는 매우 비슷하게 생겼는데 각 action에 따른 switch case를 작성하고 그에따른 리턴 값을 정의한다. 이렇게 다양한 경우를 고려해서 case를 나눌 수 있다는게 바로 useState와의 차별점이다. create, update, delete, read 모두 구현이 가능하다는 것이다! 이로인해 코드를 좀 더 직관적이게 만들어 줄 수 있고 이게 내겐 굉장한 매력으로 와 닿았다!

근데 이런생각도 할 수 있을 듯하다. 그냥 리덕스쓰면 되는거 아닌가? 라는 생각인데 리덕스는 엄밀히 전역 상태관리 라이브러리이며 꼭 필요한 상황이 아니라면 사용을 자중하는게 좋다. (다양한 전역상태를 계속 생각해주면서 개발에 임하기에는 머리가 너무 아프기 때문. 우리가 전역변수 사용을 자제하는 이유를 생각해보자.) 근데 로컬 상태값들을 관리만 하면 되지만 리덕스처럼 다양하게 상태변화를 주고싶다면 과감히 useReducer를 사용해보자아아


## useMemo

useEffect안에 리렌더링이 될때마다 특정 값을 계속해서 바꿔줘야하는 상황이 있을텐데, 만약 특정값을 계산하는게 복잡하고 시간복잡도를 많이 잡아먹는다고 가정해보자. 이 경우 useEffect가 실행될때마다 계산이 이루어져야하기 때문에 시간복잡도가 높은 연산을 계속 실행하게 된다. 이 상황을 방지하고자 리렌더링이 되더라도 계산이 일어나지 않기를 바란다? 이때에는 useMemo를 통해 성능 최적화를 해보자. useMemo는 메모리상에 계산되어야하는 값을 저장해두고 특정 값이 바뀔때에만 실행되도록 만들 수 있다.

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

위와 같이 person을 정의하게 된다면 어떻게 될까? 메모리상에 person이라는 정보를 계속 담고있기 때문에 아무리 다크모드의 상태가 변해서 리렌더링이 된다 한들, 메모리상에 담겨있는 person이라는 정보는 바뀌지 않는 것이다. 리렌더링으로 인해 굳이 실행되지 않아도 될 useEffect의 사용을 줄일 수 있는 것이다.
    
자 그리고 memo도 한번 알아보자. 우리가 일반적으로 생각해봤을때 자식 컴포넌트의 리렌더링이 일어난다면 부모는 당연히 리렌더링이 발생하지 않는다. 그러나 부모가 리렌더링이 발생 시 자식도 리렌더링이 발생하게 되는데 자식과 부모가 독립적으로 렌더되어야 한다면 이는 문제가 될 것이다. 우리는 그래서 memo를 통해서 이러한 상황을 방지할 수 있다. memo로 자식컴포넌트를 감싼다면, 부모의 리렌더링이 일어나는 시점에서 자식의 리렌더링을 막을 수 있다.

이렇게 훌륭한 useMemo와 memo도 문제점이 하나있는데 바로 메모리를 차지한다는 점이다. 이 일련의 과정들은 메모리상에 값과 컴포넌트를 저장했기에 일어난 것이다. 따라서 반드시 useMemo, memo를 써야하는 상황에서만 사용하도록 하자.


## useCallback

useCallback도 useMemo와 비슷하다. 특정값이 변한다면 useCallback내부에 선언해둔 함수가 실행되도록 할 수 있다. useCallback의 경우는 묵직한 api통신의 경우에 사용하는게 이상적이라고 생각한다. api통신을 useEffect내에 호출하게 된다면 매 렌더링 시점마다 api통신 함수가 동작하게 될것이다. 이는 애플리케이션 성능을 떨어트리는 결정적 원인이기에 useCallback을 통해 callback뒤에 배열내부에 정의한 값이 바뀌는게 아니라면 호출되지 않도록 하는 것이다. 단, useCallback 역시 useMemo와 동일한 문제점을 가지고있기 때문에 소프트웨어의 성능을 보장할 수 있는 상황에서만 사용하길 바란다.

## useRef

useRef는 가변해야하는 값을 계속 담고 있어야할때 사용하면 유용하다. 대표적인 예시는 바로 setInterval을 사용할때이다. useEffect내에 setInterval을 쓰고 setState를 통해 상태를 계속 변경해주길 원한다고 치자. 허나 이러한 방식은 정상적으로 동작하지 않는다. 이유가 뭘까? useEffect가 계속해서 state의 초기값을 기억하고 있기 때문이다. 따라서 이러한 경우에 useRef를 사용해 값이 변하고 있다는걸 인지해주게 설정하면 setInterval을 정상동작 시킬 수 있다.

useRef는 다른방식으로도 사용할 수 있다. 바로 DOM 접근을 해야할때인데 예시를 들어보겠다. input값을 change를 통해 setState의 동작을 기반으로 감지하는건 매우매우 비효율적인 행동이다. 계속해서 리렌더링을 반복해서 애플리케이션 성능을 저하시킬 수 있다. 이러한 단점을 극복하고자 useRef를 사용한다. useRef를 사용해 DOM접근시 리렌더링을 하지 않기에 이렇게 DOM내부에 value가 변할때 유용하다. 

혹은 리렌더링을 발생시키지 않는 변수를 만들어야 할 때 사용하면 유용하다. 변수를 선언할시에 useState를 사용한다면 값이 변할때마다 리렌더링을 하는데 useRef는 리렌더링이 발생하지 않기때문에 화면최적화를 할 수 있다. 이때 우리는 한가지 의문을 가질 수 있다.

        const userData = 3;
        const userRefData = useRef(3);
        
이 두개가 무슨차이일까? 값을 가지기도하고 화면에 즉시 변화된 값이 반영되는 것도 아닌데... 바로 렌더링 시점에서 확연한 차이가 들어나는데 저렇게 userData를 선언하면 리렌더링 시점에서 다시 선언되게 된다. 그러나 userRefData같이 선언시 리렌더링이 발생해도 상태를 계속 저장한다는 차이가 있다!

## forwardRef
내친김에 forwardRef까지 다뤄봤다. 일단 상황을 하나 묘사해보겠다. 우리가 커스텀 된 input을 하나 만들었고 이를 컴포넌트화해서 관리한다고 치자. 그럼 이 컴포넌트화 된 input의 ref값을 접근해서 input에 들어간 value를 가지고 온다고 가정했을때 어떻게 해야 접근해서 값을 가져올 수 있을까? ref를 props로 넘긴다? 그럼 그 ref값이 변경될때마다 리렌더링이 발생하게 될테니
ref를 사용하는 의미가 퇴색된다. 바로 이러한 상황에서 forwardRef를 사용한다. 먼저 부모에 UseRef를 하나 정의해두자. 그 다음 forwardRef를 자식컴포넌트에 

    export default forwardRef<HTMLInputElement, propsType>(ChildComponent);
    
이런식으로 감싸주자. 마지막으로 

    const ChildComponent = ({}, ref: ForwardedRef<HTMLInputElement>) => 
    
자식의 매개변수를 이런식으로 정의해주면 끝~ 이렇게 하면 자연스럽게 자식의 Ref를 조작하는게 가능해진다. 여기서 재밌는건 useRef와 동일하게 forwardRef도 리렌더링을 발생시키지 않는다는 엄청난 장점을 가지고있다!!! 이게 제일 신기했다. 자식컴포넌트가 받은 ref는 그야말로 스테이트랑은 완전히 별개의 개념이구나를 느꼈고 캡슐화된 여러 자식의 스타일을 변경해야 할때 이렇게 ref를 활용하면 엄청난 강점을 가지겠구나라고 느끼는 시간이였다.
## useContext

## useLayoutEffect

## useImperativeHandle

## useDebugValue

## useQuery

## useMutation

## customHook


# Hook-Dive 후기
