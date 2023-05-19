import React, { useMemo, useRef, useState } from 'react';

const SearchOptimization: React.FC = () => {
  const [items, setItems] = useState<string[]>([]);
  const [query, setQuery] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null) as any;
  //useMemo를 활용해 이렇게 검색결과에 대한 최적화를 해줄 수도 있다. state배열을 두개나 정의할 필요가 없으며 리렌더링에 대한 걱정도 줄일 수 있다!
  const filteredItems = useMemo(() => 
    items.filter(item => 
      item.toLowerCase().includes(query.toLowerCase())
    )
  , [items, query]);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const value = inputRef.current.value;
    if(value === "") return;
    setItems(item => {
      return [...item, value];
    });
    inputRef.current.value = "";
  };

  return (
    <>
      Search: 
      <input
        value={query}
        onChange={e => setQuery(e.target.value)}></input>
      <br />
      <br />
      <form onSubmit={onSubmit}>
        New Item: <input ref={inputRef} type="text"></input>
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

export default SearchOptimization;