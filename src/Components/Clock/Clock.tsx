import { useEffect, useState } from 'react';

const Clock = () => {
  const [curTime, setCurTime] = useState('');

  useEffect(() => {
    const timerId = setInterval(() => {
      const cur = new Date();
      const year = cur.getFullYear();
      const month = cur.getMonth() + 1;
      const date = cur.getDate();
      const hour = cur.getHours();
      const minute = cur.getMinutes();
      const second = cur.getSeconds();

      setCurTime(`${year}.${month}.${date} ${hour}:${minute}:${second}`);
    }, 1000);

    return () => {
      clearInterval(timerId);
    };
  }, []);

  return <article>{curTime}</article>;
};

export default Clock;
