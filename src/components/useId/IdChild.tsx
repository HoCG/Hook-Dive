import React from 'react';

type userType = {
  id: string;
  name: string;
  age: number;
};

type propType = {
  user: userType;
}

const IdChild = ({ user }: propType) => {
  return <div>{user.name}</div>;
};

export default IdChild;
