import { useState } from 'react';
import { ChangeEventHandler, MouseEventHandler } from 'react';
import { useRecoilState } from 'recoil';
import { newEventState } from 'state/state';
import peopleApi from 'api/peopleApi';
import { calendarApi } from 'api/calendarApi';
import debounce from 'lodash/debounce';
import { DefaultProps, Events } from 'const/type';

interface Props extends DefaultProps {
  setAttendants: React.Dispatch<
    React.SetStateAction<
      {
        name: string;
        events: Events;
      }[]
    >
  >;
  attendants: { name: string; events: Events }[];
}

const SearchUser = ({ className, attendants, setAttendants }: Props) => {
  const [searchResert, setSearchResert] = useState<{ email: string; photo: string }[]>([]);

  const [newEvent] = useRecoilState(newEventState);
  const { startDate, startTime, endTime } = newEvent;

  const searchUserHandler: ChangeEventHandler<HTMLInputElement> = async e => {
    if (!e.target.value) {
      setSearchResert([]);
      return;
    }
    const res = await peopleApi.searchUser(e.target.value);
    if (res?.result.people) {
      const people = res.result.people;
      const newSearchResert = people.map(({ emailAddresses, photos }) => ({
        email: emailAddresses?.find(email => /@rsupport.com$/.test(email.value!))?.value || '',
        photo: photos?.find(img => img.metadata?.source?.type === 'PROFILE')?.url || '',
      }));
      setSearchResert(newSearchResert);
    }
  };
  const setAttendantsHandler: MouseEventHandler<Element> = async e => {
    const target = e.target as Element;
    const email = target.closest('li')?.id;
    const start = startDate + 'T' + startTime + ':00+09:00';
    const end = startDate + 'T' + endTime + ':00+09:00';
    const res = await calendarApi.getEvents(email!, start, end);
    const events: Events = res?.result.items?.map(event => ({
      id: event.id || '',
      summary: event.summary || '',
      location: event.location || '',
      date: event.start?.date || '',
      startTime: event.start?.dateTime || '',
      endTime: event.end?.dateTime || '',
      creatorEmail: event.creator?.email || '',
    }))!;

    if (attendants.find(user => user.name === email)) return;
    if (events) {
      setAttendants(pre => [...pre, { name: email!, events: events }]);
    }
  };

  return (
    <article className={className}>
      <label className="a11y-hidden" htmlFor="searchUserInput">
        사용자 이름
      </label>
      <input
        type="text"
        id="searchUserInput"
        placeholder="참석자 이름을 입력하세요"
        onChange={debounce(searchUserHandler, 200)}
        autoComplete="off"
      />
      {searchResert.length ? (
        <ul>
          {searchResert.map(person => (
            <li key={person.email} id={person.email} onClick={setAttendantsHandler}>
              {person.photo && <img src={person.photo} alt={person.email + '의 프로필'} />}
              <p>{person.email}</p>
            </li>
          ))}
        </ul>
      ) : null}
    </article>
  );
};

export default SearchUser;
