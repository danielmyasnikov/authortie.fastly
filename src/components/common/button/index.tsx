import React from 'react';
import cn from 'classnames';
import styles from './styles.module.less';
import classNames from 'classnames';
import { colors } from 'react-select/src/theme';

interface Props {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}

export const Button: React.FC<Props> = ({ children, onClick, className, disabled }) => {
  return (
    <button
      disabled={!!disabled}
      onClick={onClick}
      className={cn(styles.btn, className, { [styles.dis]: disabled })}
    >
      {children}
    </button>
  );
};
