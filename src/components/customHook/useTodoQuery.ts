import { useMutation, useQuery, useQueryClient } from "react-query";
import { getTodos, postTodos } from '../../apis/api/todo';

type errorType = {
  message: string;
};

type postTodoType = {
  title: string;
  description: string;
};
const queryClient = useQueryClient();

export const useTodoQuery = (titleData: string | undefined, descriptionData: string | undefined) => {
  const todoMutation = useMutation(() => postTodos({
    title: titleData,
    description: descriptionData
  } as postTodoType), {
    onSuccess: () => {
      console.log(titleData);
      queryClient.invalidateQueries("todo");
    }
  });
  return { todoMutation };
};

export const useGetTodoQueryData = () => {
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
  return { data };
}