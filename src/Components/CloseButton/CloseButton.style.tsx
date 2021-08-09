import styled from 'styled-components';
import { ReactComponent as CloseIcon } from 'asset/svg/close.svg';
import { DefaultProps } from 'const/type';
import { MouseEventHandler } from 'react';
import { KeyboardEventHandler } from 'react';

interface Props extends DefaultProps {
  onClick: MouseEventHandler<Element>;
  onKeyDown?: KeyboardEventHandler;
}

const CloseButton = ({ className, onClick, onKeyDown }: Props) => {
  return (
    <button className={className} onClick={onClick} onKeyDown={onKeyDown}>
      <CloseIcon />
    </button>
  );
};

const StyledCloseButton = styled(CloseButton)`
  border: none;
  padding: 3px;
  background-color: transparent;
`;

export default StyledCloseButton;
