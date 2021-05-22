import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import { Button } from 'components/common/button';
import { Card } from 'components/common/card';
import styles from './styles.module.less';

export const Main: React.FC = () => {
  const { t } = useTranslation('main');
  const location = useLocation();

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <div className={styles.container}>
          <h1 className={styles.title}>{t('title')}</h1>
          <p className={styles.text}> {t('description')}</p>
            <Link
            to={{
              pathname: 'authorization',
              state: { background: location },
            }}
          >
            <Button>{t('join')}</Button>
          </Link>

          <div className={styles.bgImg} />
        </div>
      </div>

      <div className={styles.communityWrapper}>
        <div className={styles.container}>
          <h2 className={styles.communityTitle}>{t('community')}</h2>
          <span className={styles.communityAbout}>{t('aboutCommunity')}</span>

          <div className={styles.cards}>
            <Card />
          </div>
        </div>
      </div>
    </div>
  );
};
