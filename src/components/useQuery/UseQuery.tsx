import React from 'react';
import { useQuery } from 'react-query';
import { getJokes } from '../../apis/api/joke';
/*
  왜 react - query인가? 리액트 쿼리를 실제로 써보기전에 하나 봐야할게 있다. 
  바로 redux-thunk와 관련된 코드다. 링크 달테니까 코드 한번보자.
  https://github.com/HoCG/My_Album_Storage/blob/main/src/store/album.ts 왜 보라고 했을까~?
  보면 알겠지만 코드가 무식하게 길다. 근데 가만 생각해보면 "순수 상태관리"에만 집중했더라면 이렇게 코드가 길일은 없었을거다.
  하지만 지금 보고있는 코드는 redux-thunk를 기반으로 서버로부터 데이터를 가져오고 이를 통해 상태관리를 해주고있다. 
  즉, 서버로부터 가져온 데이터를 "상태관리"를 해야하는 공간에서 해주고 있는것. 이게 좀 모순으로 느껴져야한다.
  이건 그리고 모순된 상황이 맞다. "상태관리"에 초점을 둬야할 redux가 api통신을 통해 넘어온 데이터까지 관리해주고 있으니까.
  그래서 서버데이터를 쉽게 관리해줄 수 있는 react-query를 사용할 것이며, 그중 useQuery를 써보도록 할 것이다.
  어찌보면 react에서 관리하는 순수한 훅이 아니기 때문에 이것까지 해야하나 싶을테지만, 그래도 react-query와 더 친해지는 시간과 동시에
  훅 사용을 연습한다! 라고 긍정적으로 생각해보자.
*/

type errorType = {
  message: string;
}

const UseQuery = () => {
  //얼핏보면 isFetching, isLoading 이 두개가 똑같다고 생각할 수 있지만 차이점이 있다. isFetching은 데이터를 가지고오는 중에 사용되는 것이고, isLoading은 페이지가 불러오는 과정에서 사용되는 것이다.
  //그냥 새로고침했을때와 데이터를 다시 가지고오는 상황을 비교해보면 손쉽게 알 수 있는 차이점이다.
  const { data, isError, error, isFetching, isSuccess, isLoading } = useQuery("joke", getJokes, {
    refetchOnWindowFocus: false, // react-query는 사용자가 사용하는 윈도우가 다른 곳을 갔다가 다시 화면으로 돌아오면 이 함수를 재실행한다. 그 재실행 여부 옵션이다.
    retry: 0, // 실패시 재호출 몇번 할지
    onSuccess: data => {
      // 성공시 호출
      console.log(data);
      console.log(isFetching);
    },
    onError: (e: errorType) => {
      // 실패시 호출 (401, 404 같은 error가 아니라 정말 api 호출이 실패한 경우만 호출된다.)
      // 강제로 에러 발생시키려면 api단에서 throw Error 날린다. (참조: https://react-query.tanstack.com/guides/query-functions#usage-with-fetch-and-other-clients-that-do-not-throw-by-default)
      console.log(e.message);
    }
  });
  //아래와 같이 손쉽게 데이터를 가져오는 상태를 표현하는게 가능! 일전에 redux-thunk에서는 상태에대한 isSuccess, isFetching같은 값을 하나하나 정의해야했던 반면,
  //리액트 쿼리는 바로바로 정의해서 fetch상태를 가져오는게 가능하다.
  return (
    <div>
      <div>
        {
          data?.data.value
        }
      </div>
      <div>
        {
          isLoading && <h1>로딩중...</h1>
        }
      </div>
      <div>
        {
          isFetching && <h1>패칭중...</h1>
        }
      </div>
      <div>
        {
          isSuccess && <h1>성공적으로 가져왔어요!</h1>
        }
      </div>
      <div>
        {
          isError && <div>에러발생!</div>
        }
      </div>
    </div>
  );
};

export default UseQuery;