import { END_TIME, START_TIME } from 'const/const';
import { DefaultProps } from 'const/type';
import styled from 'styled-components';

interface props extends DefaultProps {
  room?: string;
  rooms: props['room'][];
}

const Table = ({ className, rooms }: props) => {
  const timeTable = (() => {
    const temp: string[] = [];
    for (let i = START_TIME; i <= END_TIME; i++) {
      temp.push(i + ':00');
    }
    return temp;
  })();

  return (
    <table className={className}>
      <thead>
        <tr>
          <th>시간</th>
          {rooms.map((room, index) => {
            return <th key={index}>{room}</th>;
          })}
        </tr>
      </thead>
      <tbody>
        {timeTable.map((time, i) => {
          return (
            <tr key={i}>
              <td>{time}</td>
              {rooms.map((room, index) => (
                <td key={index} id={time + '-' + room}></td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

const StyledTable = styled(Table)`
  width: 100%;
  border-collapse: collapse;

  & * {
    border: 1px solid black;
  }
`;

export default StyledTable;
