import styled from 'styled-components';
import { ReactComponent as CloseIcon } from 'asset/svg/close.svg';
import { DefaultProps } from 'const/type';
import { MouseEventHandler } from 'react';
import { KeyboardEventHandler } from 'react';

interface Props extends DefaultProps {
  onClick: MouseEventHandler<Element>;
  onKeyDown?: KeyboardEventHandler;
  type: 'del' | 'close';
}

const IconButton = ({ className, type, onClick, onKeyDown }: Props) => {
  return (
    <button className={className} onClick={onClick} onKeyDown={onKeyDown}>
      {type === 'close' && <i className="fas fa-times"></i>}
      {type === 'del' && <i className="fas fa-eraser"></i>}
      {/* <CloseIcon /> */}
    </button>
  );
};

const StyledIconButton = styled(IconButton)`
  border: none;
  padding: 3px;
  background-color: transparent;
`;

export default StyledIconButton;
