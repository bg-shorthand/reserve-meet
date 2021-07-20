import { COLORS } from 'const/const';
import { DefaultProps } from 'const/type';
import styled from 'styled-components';
import { ReactComponent as CloseIcon } from 'asset/svg/close.svg';

const Dialog = ({ className, children }: DefaultProps) => {
  return (
    <section className={className}>
      {/* <CloseIcon /> */}
      <button>
        <CloseIcon />
      </button>
      {children}
    </section>
  );
};

const StyledDialog = styled(Dialog)`
  width: 300px;
  height: 400px;
  background-color: ${COLORS.GRAY_LEVEL_1};
  padding: 50px;
  border-radius: 10px;
  position: relative;

  & > button:first-child {
    position: absolute;
    top: 20px;
    right: 20px;
    padding: 0;

    & * {
      margin: 0;
    }
  }

  & * {
    margin-bottom: 10px;
  }
`;

export default StyledDialog;
