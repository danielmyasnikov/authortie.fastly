import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './styles.module.less';

interface Props {
  children: React.ReactNode;
  onClick?: () => void;
}

export const Button: React.FC<Props> = ({ children, onClick }) => {
  return (
    <button onClick={onClick} className={styles.btn}>
      {children}
    </button>
  );
};
