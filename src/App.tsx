import { createContext } from "react";
import Memo from './components/useMemo/Memo';
import UseMemo from './components/useMemo/UseMemo';
import UseReducer from './components/useReducer/UseReducer';
import UseCallback from './components/useCallback/UseCallback';
import UseState from './components/useState/UseState';
import UseRef from './components/useRef/UseRef';
import UseRefForSetData from './components/useRef/UseRefForSetData';
import UseInterval from './components/useRef/UseInterval';
import ForwardRef from './components/useRef/forwardRef/ForwardRef';
import ForwardPractice from './components/useRef/forwardRef/ForwardPractice';
import UseContext from "./components/useContext/UseContext";
import UseEffectForLayout from "./components/useLayoutEffect/UseEffectForLayout";
import UseImperativeHandle from "./components/useImperativeHandle/UseImperativeHandle";
import UseEffectDelay from "./components/useRef/callbackRef/useEffectDelay";
import CallBackRef from "./components/useRef/callbackRef/CallBackRef";

type State = {
  id: number,
  name: string,
  age: number,
  phoneNumber: string
};

export const AppContext = createContext<State | null>(null);

const App = () => {
  const user: State = {
    id: 1,
    name: "호시지",
    age: 27,
    phoneNumber: "01033333333"
  } 
  return (
    <AppContext.Provider value={user}>
      <UseEffectDelay></UseEffectDelay>
      <CallBackRef></CallBackRef>
    </AppContext.Provider>
  )
}

export default App
