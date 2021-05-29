import React from 'react';
import styles from './styles.module.less';

interface Props {
  Component: React.FC<any> | React.ComponentClass<any>;
}

export const Container: React.FC<Props> = ({ Component }) => (
  <div className={styles.container}>
    <Component />
  </div>
);
