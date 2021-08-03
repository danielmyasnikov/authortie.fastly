import React from 'react';
import styles from './styles.module.less';

interface Props {
  Component: React.FC<any> | React.ComponentClass<any>;
}

const Container: React.FC<Props> = ({ Component }) => (
  <div className={styles.container}>
    <Component />
  </div>
);

export default Container;
