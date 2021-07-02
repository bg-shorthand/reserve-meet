import { isSign } from 'gcp/gcp';
import { useEffect } from 'react';

const Main = () => {
  useEffect(() => {
    console.log('main', isSign);
  });

  return <h1>Hello World</h1>;
};

export default Main;
