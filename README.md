# Hook-Dive
리액트 훅에 좀 더 빠져봐요.


## useEffect
  스테이트의 값이 변할때마다, 그리고 넘겨받은 props값이 변경될 때마다 자연스럽게 useEffect가 동작하게 된다. 그리고 화면이 마운트, 언마운트 되는 시점에서 실행된다는 점. useEffect뒤에 배열을 넣어줄 수가 있다. 빈배열의 경우 마운트가 되는 시점에만, 그리고 배열안에 값을 넣으면 넣은 값이 변경될때에만 useEffect가 실행되도록 할 수 있다. useEffect안에 return을 두는 경우는 unMount의 효과를 기대할 수 있다. 들 수 있는 예시는 인터벌이 있을 것이다. 인터벌을 계속 지정해둔 경우 clean을 해줄때까지 동작을 하게된다. 이런 문제를 방지하고자 unMount시에 clean을 할 수 있도록 해주는 것이다.
## useMemo

## useCallback

## useContext
