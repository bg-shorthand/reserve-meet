import { useEffect, useState } from 'react';
import { calendarApi } from 'api/calendarApi';
import { userApi } from 'api/userApi';

const Main = () => {
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [events, setEvents] = useState([{ location: '', summary: '', time: '' }]);

  useEffect(() => {
    let profileTimerId: NodeJS.Timeout;
    let examTimerId: NodeJS.Timeout;

    const getProfile = async () => {
      const profile = await userApi.getProfile();
      if (profile) {
        setName(profile.getName());
        setImage(profile.getImageUrl());
      } else {
        clearTimeout(profileTimerId);
        profileTimerId = setTimeout(getProfile, 100);
      }
    };
    getProfile();

    const exam = async () => {
      const res = await calendarApi.getSample();
      if (res) {
        clearTimeout(examTimerId);
        const newEvents = res.result.items
          .filter((v: any) => v.status !== 'cancelled')
          .map((v: any) => ({ summary: v.summary, location: v.location, time: v.start.dateTime }));
        setEvents(newEvents);
      } else {
        clearTimeout(examTimerId);
        examTimerId = setTimeout(exam, 100);
      }
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
