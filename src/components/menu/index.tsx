import React from 'react';
import { useTranslation } from 'react-i18next';
import logo from 'assets/logo.png';
import styles from './styles.module.less';

export const Menu: React.FC = () => {
  const { t } = useTranslation('main');
  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <img src={logo} alt="authortie" className={styles.logo} />
      </div>
    </div>
  );
};
