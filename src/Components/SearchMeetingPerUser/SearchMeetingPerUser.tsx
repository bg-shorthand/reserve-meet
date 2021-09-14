import { calendarApi } from 'api/googleLib/calendarApi';
import StyledSearchUser from 'Components/SearchUser/SearchUser.style';
import { TIME_TABLE } from 'const/const';
import { DefaultProps, Events } from 'const/type';
import createEventsFromAsyncRes from 'module/createEventsFromAsyncRes';
import { MouseEventHandler } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { curDateState, isOpenState, viewEventIdState, viewEventState } from 'state/state';

const SearchMeetingPerUser = ({ className }: DefaultProps) => {
  const curDate = useRecoilValue(curDateState);
  const setViewEventId = useSetRecoilState(viewEventIdState);
  const setIsOpen = useSetRecoilState(isOpenState);

  const [meetingPerUser, setMeetingPerUser] = useState<{ name: string; meetings: Events }[]>([]);

  const setList = async (name: string) => {
    if (meetingPerUser.find(pre => pre.name === name)) return;

    const startTime = curDate + 'T00:00:00+09:00';
    const endTime = curDate + 'T23:59:00+09:00';

    const res = await calendarApi.getEvents(name, startTime, endTime);
    if (res && res.result.items) {
      const events = createEventsFromAsyncRes(res.result.items);
      setMeetingPerUser(pre => [...pre, { name, meetings: events }]);
    }
  };

  const viewEventHandler: MouseEventHandler<Element> = e => {
    setViewEventId(e.currentTarget.id);
    setIsOpen(pre => ({ ...pre, viewEvent: true }));
  };

  useEffect(() => {
    setMeetingPerUser([]);
  }, [curDate]);

  return (
    <article className={className}>
      <h2>개인별 회의 일정 검색</h2>
      <div>
        <StyledSearchUser setList={setList} />
      </div>
      {meetingPerUser.length ? (
        <table>
          <thead>
            <tr>
              <th>이름</th>
              {TIME_TABLE.map(time => (
                <td key={time}>{time}</td>
              ))}
            </tr>
          </thead>
          <tbody>
            {meetingPerUser.map(item => {
              return (
                <tr key={item.name}>
                  <th>{item.name}</th>
                  {TIME_TABLE.map(time => {
                    const isMeeting = item.meetings.find(
                      meeting => meeting.startTime <= time && meeting.endTime > time,
                    );
                    return (
                      <td
                        key={time}
                        className={isMeeting ? 'isMeeting' : ''}
                        id={isMeeting?.id}
                        onClick={viewEventHandler}
                      >
                        {isMeeting ? 'O' : ''}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : null}
    </article>
  );
};

export default SearchMeetingPerUser;
