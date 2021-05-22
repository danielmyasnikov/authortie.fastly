import React from 'react';
import { useTranslation } from 'react-i18next';
import logo from 'assets/logo.png';
import Email from 'assets/email.svg';
import User from 'assets/user.svg';
import { Button } from 'components/common/button';
import styles from './styles.module.less';

export const Menu: React.FC = () => {
  const { t } = useTranslation('menu');
  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <img src={logo} alt="authortie" className={styles.logo} />
        <div className={styles.itemsWrapper}>
          <span className={styles.item}>{t('analitics')}</span>
          <span className={styles.item}>{t('community')}</span>
          <span className={styles.item}>{t('forBusiness')}</span>
        </div>
        <Button>{t('createRequest')}</Button>
        <Email className={styles.icon} />
        <User className={styles.icon} />
        <span className={styles.userName}>User</span>
      </div>
    </div>
  );
};
