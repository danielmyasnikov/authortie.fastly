import React from 'react';
import cn from 'classnames'
import styles from './styles.module.less';
import classNames from 'classnames';

interface Props {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export const Button: React.FC<Props> = ({ children, onClick , className}) => {
  return (
    <button onClick={onClick} className={cn(styles.btn, className)}>
      {children}
    </button>
  );
};
