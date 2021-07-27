import styled from 'styled-components';
import { ReactComponent as CloseIcon } from 'asset/svg/close.svg';
import { DefaultProps } from 'const/type';
import { COLORS } from 'const/const';

const Dialog = ({ className, children }: DefaultProps) => {
  return (
    <section className={className}>
      <button>
        <CloseIcon />
      </button>
      {children}
    </section>
  );
};

const StyledDialog = styled(Dialog)`
  width: 500px;
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
