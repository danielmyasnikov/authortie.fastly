import React from 'react';
import styles from './styles.module.less';

interface Props {
  children: React.ReactNode;
  dataTip?: string;
  dataFor?: string;
  dataTipDisable?: boolean;
}

export const Tag: React.FC<Props> = ({ children, dataTip, dataFor, dataTipDisable }) => {
  return (
    <div
      data-tip={dataTip}
      data-for={dataFor}
      data-tip-disable={dataTipDisable}
      className={styles.tag}
    >
      {children}
    </div>
  );
};
