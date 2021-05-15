import React from 'react';
import styles from './styles.module.less';

interface Props {
  children: React.ReactNode;
}

export const Tag: React.FC<Props> = ({ children }) => {

  return <div className={styles.tag}>{children}</div>;
};
