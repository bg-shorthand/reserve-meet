import styled from 'styled-components';
import { ReactComponent as CloseIcon } from 'asset/svg/close.svg';
import { DefaultProps } from 'const/type';
import { COLORS } from 'const/const';
import { KeyboardEventHandler } from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';
import { useResetRecoilState, useSetRecoilState } from 'recoil';
import { isOpenState } from 'state/state';

const Dialog = ({ className, children }: DefaultProps) => {
  const ref = useRef(null);
  const resetIsOpen = useResetRecoilState(isOpenState);
  const setIsOpen = useSetRecoilState(isOpenState);

  const focusFirstHandler: KeyboardEventHandler = e => {
    if (e.key !== 'Tab') return;
    e.preventDefault();
    const $modal = ref.current as unknown as HTMLElement;
    const $firstFocusableElement = $modal.querySelectorAll(
      'button:not(disabled), input, textarea, select',
    )[0] as HTMLElement;
    $firstFocusableElement.focus();
  };
  const closeByEscHandler: KeyboardEventHandler = e => {
    if (e.key !== 'Escape') return;
    resetIsOpen();
    setIsOpen(pre => ({ ...pre, spinner: false }));
  };

  useEffect(() => {
    const $modal = ref.current as unknown as HTMLElement;
    const $firstFocusableElement = $modal.querySelectorAll(
      'button:not(disabled), input, textarea, select',
    )[0] as HTMLElement;
    $firstFocusableElement.focus();
  }, []);

  return (
    <section className={className} ref={ref} onKeyDown={closeByEscHandler}>
      {children}
      <button onKeyDown={focusFirstHandler}>
        <CloseIcon />
      </button>
    </section>
  );
};

const StyledDialog = styled(Dialog)`
  width: 500px;
  background-color: ${COLORS.GRAY_LEVEL_1};
  padding: 50px;
  border-radius: 10px;
  position: relative;

  & > button:last-child {
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
