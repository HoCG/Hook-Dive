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
setState를 통해 상태 수정시 복잡한 상태변화를 반복적으로 해야 한다면 useReducer를 사용하는게 좋다. 물론 setState가 정의된 영역의 함수화를 통해 문제를 해결할 수 있지만 state를 위해서 따로 함수를 만들어서 state관리를 돕는다? 그건 합리적이지 못하다. 이러한 이유로 우리는 useReducer라는 훅을 사용할 것이다. 정말 쉽게 useReducer를 해보자면 로컬 state 전용 redux다. useReducer와 redux의 코드는 매우 비슷하게 생겼는데 각 action에 따른 switch case를 작성하고 그에따른 리턴 값을 정의한다. 이렇게 다양한 경우를 고려해서 case를 나눌 수 있다는게 바로 useState와의 차별점이다. create, update, delete, read 모두 구현이 가능하다는 것이다! 이로인해 코드를 좀 더 직관적이게 만들어 줄 수 있고 이게 내겐 굉장한 매력으로 와 닿았다!

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
    
이건 결과가 어찌될까? 또 false다. 왜 그럴까? 자바스크립트는 A = {}; B = A; A === B; 이런식으로 비교하는게 아니라면 객체는 무조건 다른 값이다라고 생각한다. 따라서 darkMode의 상태가 변할때마다 person이 새롭게 정의되고 person이라는 값이 아무리 기존값과 동일하다지만 위에 특성때문에 person === person은 false를 뱉게 되는거다. 이때 useMemo를 사용하는 것이다.

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

useRef는 다른방식으로도 사용할 수 있다. 바로 DOM 접근을 해야할때인데 예시를 들어보겠다. input값을 change를 통해 setState의 동작을 기반으로 감지하는건 매우매우 비효율적인 행동이다. 계속해서 리렌더링을 반복해서 애플리케이션 성능을 저하시킬 수 있다. 이러한 단점을 극복하고자 useRef를 사용한다. useRef를 사용해 DOM접근시 리렌더링을 하지 않기에 이렇게 DOM내부에 value가 변할때 유용하다. 문제가 있다. useRef를 통해 DOM에 접근하는건 근본적으로 getElementById와 같은 접근방법과 동일하다. 잘 알겠지만 getElementById는 트리 탐색을 통해 DOM에 접근하는 방식이기 때문에 자주 사용하면 애플리케이션 성능저하를 발생시킬 수 있다. 따라서 useRef가 마냥 좋은건 아니라는 것.

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

## callbackRef

우리가 만약에 컴포넌트가 실행되자마자 useEffect를 통해 useRef로 DOM을 접근한다고 치자. 

      useEffect(() => {
        if (childRef.current) {
          childRef.current.style.backgroundColor = "black";
        }
      });

근데 솔직히 좀 불편하고 이상하다. useRef랑 useEffect라는 훅을 두개나 사용해야하는데 너무 불편하게 짝이없다. 이럴때 어떻게해야 좀 더 간결하게 코드작성이 가능할까?

      const childRef = useCallback((node: HTMLElement | null) => {
        if (node !== null) {
          node.style.backgroundColor = "black";
        }
      }, [])

바로 이렇게 useCallback을 활용하는 것! 지금에야 아주 간단한 예제로 작성해서 그렇지만 활용방법은 아주 많을 것으로 보인다. 대표적인 예시는 api를 통해 items를 가지고 오는 경우이다. 이때 가지고 온 글자 길이 따라 화면에서 렌더링을 달리해야 한다면, 그러니까 ref를 통해 div의 길이가 넘어갔는지 안넘어갔는지를 체크해야한다면, 콜백Ref를 활용해보자. 

## useContext

전역적으로 상태를 사용해야할때 사용하는 훅이다. 기존 context를 좀 더 유연하게 사용하도록 만들어준다는 특징이 있다. props로 계속해서 데이터를 넘겨주어야하는 일명 "드릴링"은 무척 번거롭게 짝이없다. 이러한 문제를 해결하고자 전역으로 쓸 수 있는 상태가 필요하게 되었고 context는 이 문제를 해결해주었다. 하지만 리덕스와 리코일이 있는 현 시점에서 굳이 사용성이 떨어지는 context를 써야할까라는 생각이 든다. 

## useLayoutEffect

완전 간단히 설명하면 vue에서의 created. 즉, 화면이 렌더링되기전에 수행되는 훅이 useLayoutEffect, 반대로 화면이 렌더링되고나서 실행되는 훅이 useEffect이다. 즉 useLayoutEffect의 사용은 무척 조심해야한다. 왜냐하면 useLayoutEffect가 적용이 완료되는 시점까지 화면이 렌더링되지 않는다는 문제로 인해 사용자는 계속해서 하얀화면을 바라봐야하기 때문이다. 그럼에도 useLayoutEffect의 최장점은 뭐니뭐니해도 화면 깜빡임이 없다는 것. 사용자에게 데이터가 자연스럽게 보일 수 있다. 예를들어 boolean값을 바꿔서 사용자가 누구냐에 따라 렌더링이 달라져야 한다면, 그러니까 렌더링전에 먼저 설정되어야하는 간단한 값이 있다면 그때에는 useLayoutEffect쓰는 거다. 이렇게 미리 값을 설정할 시에 화면이 그려지면서 자연스럽게 데이터가 들어가니 사용자 입장에서 무척 용이할 것이다. 그러나 그게 아니라 묵직한 일들(api통신과 같은 동작들)은 useEffect(()=>{},[])에게 맡기도록 하자.

## useImperativeHandle

useImperativeHandle은 forwardRef를 사용시 적용가능한 훅이다. 자식에서 부모의 함수를 사용할때 prop을 쓰지않는가? 근데 부모에서 자식의 함수를 쓰고싶다고 치자. 어떻게 사용이 가능할까? 물론 부모에서 함수를 작성한 후에 자식으로 넘겨주는 방법도 있겠지만 엄연히 자식에서 동작해야하는 함수가 부모에 있다는게 너무 이상할 뿐더러 부모 컴포넌트 코드의 길이가 이상하게 길어질 수 있다. 이에 우리는 useImperativeHandle훅을 통해 자식의 함수에 접근이 가능해진다. ref를 넘겨받은 자식에서 useImperativeHandle훅에 함수를 정의해두면 ref.current를 통해 해당 함수에 접근이 가능하다! 

이렇게만 보면 useImperativeHandle훅이 굉장히 좋아보일텐데 한가지 큰 문제점이 있다. 바로 리액트의 컨셉에서 벗어난 코딩을 해야한다는 것이다. 이게 무슨소릴까? 바로 명령형으로 코드를 작성해야 한다는게 문제라는거다. 기본적으로 리액트는 state를 통해 ui를 변경시키는 선언형 프로그래밍을 지향한다. useImperativeHandle의 경우 이런 방식이 아니기 때문에 특별한 케이스가 아니면 사용을 안하는게 좋다.(부모에서 자식의 DOM을 조작해야할때 등등...)

## useDebugValue

리액트 devTool 사용시 로그창에서 확인하고자 하는 값을 확인가능하게 해주는 훅이다. 콘솔로그와 비슷하다. 막상 내가 써놓고도 뭐 추가할 내용이 없네...

## useInsertionEffect

## useId

useId의 경우 고유한 Id값을 만들어야 할때 유용하게 사용가능하다. id값을 어떻게 설정해야할지 고민하기보단, 이렇게 useId를 사용해보자. 간단하게 Id값이 생긴다! 좀 더 서버 친화적인 id값을 기반으로 유저 고유의 id값을 가지고있어야 한다거나 컴포넌트의 key값을 넣어줘야하는 상황에서 사용하면 좋겠다는 생각이 들었다.

## useDeferredValue

## useTransition

## useQuery

react-query는 엄밀히 말해서 리액트에서 제공하는 순수한 훅이 아니다. 외부 라이브러리이고 리액트 훅처럼 상태관리를 쉽게 해주기 위해서 사용되는 녀석이기 때문이다. 그럼에도 불구하고 왜 react-query인가? 리액트 쿼리를 실제로 써보기전에 하나 봐야할게 있다. redux-thunk와 관련된 코드다. 링크 달거니까 코드 한번보자. 


    https://github.com/HoCG/My_Album_Storage/blob/main/src/store/album.ts 


왜 보라고 했을까~? 보면 알겠지만 코드가 무식하게 길다.(물론 내가 원숭이같이 코드를 짠것도 있지만...) 근데 가만 생각해보면 "순수 상태관리"에만 집중했더라면 이렇게 코드가 길일은 없었을거다. 하지만 지금 보고있는 코드는 redux-thunk를 기반으로 서버로부터 데이터를 가져오고 이를 통해 상태관리를 해주고있다. 즉, 서버로부터 가져온 데이터를 "상태관리"를 해야하는 공간에서 해주고 있는것. 이게 좀 모순으로 느껴져야한다. 이건 그리고 모순된 상황이 맞다. "상태관리"에 초점을 둬야할 redux가 api통신을 통해 넘어온 데이터까지 관리해주고 있으니까. 그래서 서버데이터를 쉽게 관리해줄 수 있는 react-query를 사용할 것이며, 그중 useQuery를 써보도록 할 것이다. 어찌보면 react에서 관리하는 순수한 훅이 아니기 때문에 이것까지 해야하나 싶을테지만, 그래도 react-query와 더 친해지는 시간과 동시에 훅 사용을 연습한다! 라고 긍정적으로 생각해보자.


먼저 useQuery는 서버로부터 데이터를 GET해올때 사용이 가능하다. 이때 data를 정의하여 해당 데이터를 사용할 수 있으며, 통신이 성공, 실패, 로딩중, 데이터를 가져오는중에 대한 상태정보를 가져올 수도 있다. 이 일련의 과정이 redux를 사용했을때는 엄청나게 복잡하고 코드가 더러워졌었는데 이를 통해 좀 더 직관적으로 코드를 작성할 수 있어서 좋다는거~

## useQueries

간단하게 설명하자면 useQueries가 여러번 사용될때 쓰는녀석. 그야말로 닉값 제대로하는 훅이라고 할수있다.(...) useQueries내에 api호출을 여러개 작성해두면 작성한 api에 대한 작업을 수행한다. 그것도 아주 깔끔하게~

대신에 사용할때에는 배열에 접근하는 방식으로 각각의 api에 대한 처리를 사용해야한다. 예를 들어서 아래와 같이 useQueries를 선언했다면


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


queriesData.forEach(api => {})로 접근해서 api.data의 형태로 응답정보를 확인해야한다는 사실~

## useMutation

GET을 제외한 다른 HTTP 메소드로 api를 호출해야할때 쓰는 훅이다. 간단하게 요약하자면 이렇고, useQuery와 비슷하게 성공했을때 실패했을때에 대한 분기를 둘 주 있다는 장점이 있다. 나는 이번에 훅다이브를 하기전까지만 하더라도 리액트 쿼리에 회의적이였었는데 그 결정적인 원인제공이 바로 useMutation이였다. "아니, Post를 했는데 다시 데이터를 Get하려면 어케 해야하는거야?"라는 점에서 엄청 해맸었는데 그 궁금증을 명쾌하게 해결했다. 바로 아래와 같이 useQueryClient를 활용해서 invalidateQueries를 사용하는것!!!


      const queryClient = useQueryClient();
      const { data } = useQuery(["todo"], getTodos, {
        refetchOnWindowFocus: false, 
        retry: 0,
        onSuccess: data => {
          console.log(data);
        },
        onError: (e: errorType) => {
          console.log(e.message);
        }
      });
      const todoMutation = useMutation(() => postTodos({
        title: titleRef.current?.value,
        description: descriptionRef.current?.value
      } as postTodoType), {
        onSuccess: () => {
          queryClient.invalidateQueries("todo");
        }
      });


와 이거 진짜 대박이였다... POST를 통한 todo를 등록할시 todo Key에 해당하는 데이터가 변했다는걸 알려주고 todo에 걸려있는 useQuery를 다시 실행한다! 감동 그자체.... 이로인해 리액트 쿼리는 나에게 신이 되었다. 그리고 한편으로 redux-thunk와는 이별이다. 잘가 redux-thunk. 세이 굿바이

## useInfiniteQuery

useInfiniteQuery는 무한스크롤을 통해 계속해서 데이터를 쭉쭉 땡겨와야하는 상황에서 적절한 훅이다. 예를들어 채팅내역과 게시판 내역을 조회하는 상황이 대표적 예시일 것이다.
이 훅도 직접 사용하면서 연습해보고 싶지만 결정적인 문제가 한가지 있다. useInfiniteQuery는 대용량 데이터를 쭉 스크롤할때 적절한 방식이라는 것(...) 현재 나한테 그정도 대규모 데이터가 없기때문에 연습이 불가능한 훅이다.

## customHook


# Hook-Dive 후기
