import { useEffect, useState } from 'react';
import { calendarApi } from 'api/calendarApi.js';
import { userApi } from 'api/userApi';
import { initClient } from 'lib/googleApiLibrary';

const Main = () => {
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [events, setEvents] = useState([]);

  useEffect(() => {
    console.log(2);

    const getProfile = async () => {
      const profile = await userApi.getProfile();
      console.log(profile);
      setName(profile.getName());
      setImage(profile.getImageUrl());
    };
    getProfile();

    const exam = async () => {
      const res = await calendarApi.getSample();
      // const newEvents = res
      //   .filter(v => v.status !== 'cancelled')
      //   .map(v => ({ summary: v.summary, location: v.location, time: v.start.dateTime }));
      setEvents(res);
    };
    exam();
  }, []);

  return (
    <>
      <h1>Hello, {name}</h1>
      <img src={image} alt={name} />
      <ul>
        {/* {events.map((event, i) => (
          <li key={i}>{`요약: ${event.summary}, 장소: ${event.location}, 시간: ${event.time}`}</li>
        ))} */}
      </ul>
    </>
  );
};

export default Main;
