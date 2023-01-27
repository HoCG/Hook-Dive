# 잠깐! React.FC 넌 뭐니?

React.FC는 아래와 같은 type을 가진다.
눈여겨볼 점은 ref가 없다???? 아니 ref가 넘어올 걸 고려하지않고 만든건가? 싶은 의구심이 들었다.

    제네릭 타입
    type FC<P = {}> = FunctionComponent<P>

    interface FunctionComponent<P = {}> {
      (props: PropsWithChildren<P>, context?: any): ReactElement<any, any> | null
      propTypes?: WeakValidationMap<P> | undefined
      contextTypes?: ValidationMap<any> | undefined
      defaultProps?: Partial<P> | undefined
      displayName?: string | undefined
    }

그리고 FC는 defaultProps기능을 제공하지 않는다. 이로인해 props값을 default로 잡아줘야하는 경우에서는 오류를 내뱉는 것.
따라서 앞으로는 FC사용을 하지않고 개발하는걸 해보자.