import addPrefix0 from 'module/addPrefix0';
import { useEffect, useState } from 'react';

const Clock = () => {
  const [curTime, setCurTime] = useState('');

  useEffect(() => {
    const timerId = setInterval(() => {
      const cur = new Date();
      const year = cur.getFullYear();
      const month = cur.getMonth() + 1;
      const date = cur.getDate();
      const hour = addPrefix0(cur.getHours());
      const minute = addPrefix0(cur.getMinutes());
      const second = addPrefix0(cur.getSeconds());

      setCurTime(`${year}.${month}.${date} ${hour}:${minute}:${second}`);
    }, 1000);

    return () => {
      clearInterval(timerId);
    };
  }, []);

  return <article>{curTime}</article>;
};

export default Clock;
