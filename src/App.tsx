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
const App: React.FC = () => {
  return (
    <div>
      <ForwardPractice></ForwardPractice>
    </div>
  )
}

export default App
