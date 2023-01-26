import React, { useRef, useState } from 'react';

const DirtySearch: React.FC = () => {
  //검색을 한 결과를 보여주기위해서 useState배열을 두개나 사용한다? 이게 맞을까?
  const [items, setItems] = useState<string[]>([]);
  const [filteredItems, setFilteredItems] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null) as any;
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const value = inputRef.current.value;
    if(value === "") return;
    setItems(item => {
      return [...item, value];
    });
    setFilteredItems(item => {
      return [...item, value];
    });
    inputRef.current.value = "";
  }
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    //매 검색마다 filteredItems의 값을 바꿔준다.
    setFilteredItems(
      items.filter(item => {item.toLowerCase().includes(value.toLowerCase())})
    );
  }
  return (
    <>
      Search: 
      <input
        onChange={onChange}></input>
      <br />
      <br />
      <form onSubmit={onSubmit}>
        New Item: 
        <input ref={inputRef} type="text"></input>
        <button type="submit">Add</button>
      </form>
      <h3>Items</h3>
      {
        filteredItems.map(item => {
          <div>
            {
              item
            }
          </div>
        })
      }
    </>
  );
};

export default DirtySearch;