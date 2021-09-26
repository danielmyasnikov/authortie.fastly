import React from 'react';
import cn from 'classnames';
import styles from './styles.module.less';

interface Props {
  children: React.ReactNode;
  dataTip?: string;
  dataFor?: string;
  dataTipDisable?: boolean;
  className?: string;
}

export const Tag: React.FC<Props> = ({
  className, children, dataTip, dataFor, dataTipDisable,
}) => {
  return (
    <div
      data-tip={dataTip}
      data-for={dataFor}
      data-tip-disable={dataTipDisable}
      className={cn(styles.tag, className)}
    >
      {children}
    </div>
  );
};
