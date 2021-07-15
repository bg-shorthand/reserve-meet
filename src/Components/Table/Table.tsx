import { END_TIME, START_TIME } from 'const/const';
import { DefaultProps } from 'const/type';

interface props extends DefaultProps {
  rooms: string[];
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
              <th>{time}</th>
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

export default Table;
