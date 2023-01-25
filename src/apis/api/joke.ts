import { customAxios } from "../axios/customAxios";

const getJokes = () => {
  return customAxios.get('/jokes/random');
};

export { getJokes };