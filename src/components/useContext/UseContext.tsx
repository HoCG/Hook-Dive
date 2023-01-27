import { useContext } from 'react';
import { AppContext } from "../../App";

const UseContext = () => {
  //useContext는 이렇게 전역적으로 상태를 가져와서 다룰 수 있다는 특징이 있다.
  //근데 드는 생각은 솔직히 그냥 리덕스나 리코일쓰는게 몇배는 나을듯...
  const user = useContext(AppContext);
  return (
    <div>
      <h2>{user?.name}</h2>
      <h2>{user?.phoneNumber}</h2>
    </div>
  );
};

export default UseContext;