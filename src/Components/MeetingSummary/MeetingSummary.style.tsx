import styled from 'styled-components';
import MeetingSummary from './MeetingSummary';
import { COLORS, TABLE_CELL_HEIGHT } from 'const/const';
import { useRecoilValue } from 'recoil';
import { renderEventsState } from 'state/state';

const StyledMeetingSummary = styled(MeetingSummary)`
  position: absolute;
  top: -1px;
  left: 0;
  margin: 0;
  border-top: 1px dashed ${COLORS.TEAL_LEVEL_4};
  border-bottom: 1px dashed ${COLORS.TEAL_LEVEL_4};
  border-left: 10px solid ${COLORS.TEAL_LEVEL_4};
  padding: 0 10px;
  display: flex;
  align-items: center;
  background-color: ${COLORS.GRAY_LEVEL_2};
  width: 100%;
  z-index: 9;
  height: ${({ time, room }) => {
    const renderEvents = useRecoilValue(renderEventsState);
    const event = renderEvents.find(
      ({ startTime, location }) => startTime === time && location.split(' ')[1] === room,
    );

    if (event) {
      const startHour = +event.startTime.split(':')[0] * 60;
      const startMin = +event.startTime.split(':')[1];
      const endHour = +event.endTime.split(':')[0] * 60;
      const endMin = +event.endTime.split(':')[1];
      return ((endHour + endMin - startHour - startMin) / 30) * TABLE_CELL_HEIGHT + 1 + 'px';
    }
  }};

  h1 {
    font-size: 1rem;
    font-weight: 400;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  button {
    position: absolute;
    top: 3px;
    right: 3px;
    padding: 0;
    display: none;
  }

  &:hover button {
    display: block;
  }
`;

export default StyledMeetingSummary;
