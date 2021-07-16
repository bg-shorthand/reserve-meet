import ReactDOM from 'react-dom';
import { DefaultProps } from 'const/type';

const Portal = ({ children }: DefaultProps) => {
  return ReactDOM.createPortal(children, document.getElementById('modalRoot')!);
};

export default Portal;
