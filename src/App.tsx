import { createContext } from "react";
import UseEffect from './components/useEffect/UseEffect';
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
      <div>
        <UseContext></UseContext>
      </div>
    </AppContext.Provider>
  )
}

export default App
