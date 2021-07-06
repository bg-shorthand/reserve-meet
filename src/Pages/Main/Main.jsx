import { useEffect, useState } from 'react';
import { calendarApi } from 'gcp/calendarApi.js';
import { userApi } from 'gcp/userApi';

const Main = () => {
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const getProfile = async () => {
      const profile = await userApi.getProfile();
      setName(profile.getName());
      setImage(profile.getImageUrl());
    };
    setTimeout(getProfile, 500);

    const exam = async () => {
      const res = await calendarApi.getSample();
      const newEvents = res
        .filter(v => v.status !== 'cancelled')
        .map(v => ({ summary: v.summary, location: v.location, time: v.start.dateTime }));
      setEvents(newEvents);
    };
    exam();
  }, []);

  return (
    <>
      <h1>Hello, {name}</h1>
      <img src={image} alt={name} />
      <ul>
        {events.map((event, i) => (
          <li key={i}>{`요약: ${event.summary}, 장소: ${event.location}, 시간: ${event.time}`}</li>
        ))}
      </ul>
    </>
  );
};

export default Main;
