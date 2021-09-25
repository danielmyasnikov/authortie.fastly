import React from 'react';
import { useTranslation } from 'react-i18next';
import Telegram from 'assets/telegram.svg';
import Instagram from 'assets/instagram.svg';
import Facebook from 'assets/facebook.svg';
import styles from './styles.module.less';

export const Footer: React.FC = () => {
  const { t } = useTranslation('footer');
  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <div className={styles.info}>
          <span className={styles.title}>{t('authortie')}</span>
          <span className={styles.description}>{t('rights')}</span>
        </div>

        <div className={styles.menu}>
          <span className={styles.titleMenu}>{t('privacy')}</span>
          <span className={styles.titleMenu}>{t('analitics')}</span>
          <span className={styles.titleMenu}>{t('community')}</span>
          <span className={styles.titleMenu}>{t('forBusiness')}</span>
        </div>
        <div className={styles.iconsWrapper}>
          <a href="https://www.facebook.com/authortiepage" target="_blank" className={styles.link} rel="noreferrer">
            <Facebook className={styles.icon} />
          </a>
          <a href="https://www.instagram.com/authortie" target="_blank" className={styles.link} rel="noreferrer">
            <Instagram className={styles.icon} />
          </a>
          <a href="https://t.me/authortie" target="_blank" className={styles.link} rel="noreferrer">
            <Telegram className={styles.icon} />
          </a>
        </div>
      </div>
    </div>
  );
};
