import { useEffect } from 'react';

const Main = () => {
  useEffect(() => {
    console.log(gapi.client.calendar);
  });

  return <h1>Hello World</h1>;
};

export default Main;
