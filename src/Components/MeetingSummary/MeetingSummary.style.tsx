import { COLORS } from 'const/const';
import styled from 'styled-components';
import MeetingSummary from './MeetingSummary';

const StyledMeetingSummary = styled(MeetingSummary)`
  position: absolute;
  top: -1px;
  left: 0;
  margin: 0;
  border-left: 10px solid ${COLORS.TEAL_LEVEL_4};
  padding: 0 10px;
  display: flex;
  align-items: center;
  background-color: ${COLORS.GRAY_LEVEL_2};
  width: 100%;
  z-index: 999;
`;

export default StyledMeetingSummary;
