import InputPart from './InputPart';
import ListPart from './ListPart';
import { useGetTodoQueryData } from './UseTodoQuery';

type todoType = {
  id: string;
  title: string;
  description: string;
};


const CustomHookUseComponent = () => {
  const { data } = useGetTodoQueryData();
  return (
    <div>
      <InputPart></InputPart>
      <ListPart todoList={data?.data as todoType[]}></ListPart>
    </div>
  );
};

export default CustomHookUseComponent;