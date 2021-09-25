import React from 'react';
import Close from 'assets/close.svg';

import styles from './styles.module.less';

interface Props {
  children: React.ReactNode;
  onClose: (value: boolean) => void;
  open: boolean;
}

export const Modal: React.FC<Props> = ({ onClose, children, open }) => {
  if (!open) return null;
  return (
    <div className={styles.modalWrapper}>
      <div className={styles.contaier}>
        <Close className={styles.exit} onClick={() => onClose(false)} />
        {children}
      </div>
      <div className={styles.overlay} />
    </div>
  );
};
