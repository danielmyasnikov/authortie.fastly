import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './styles.module.less';

interface Props {
  children: React.ReactNode;
}

export const Button: React.FC<Props> = ({ children }) => {
  return <button className={styles.btn}>{children}</button>;
};
