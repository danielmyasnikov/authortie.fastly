import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from 'components/common/button';
import { Card } from 'components/common/card';
import styles from './styles.module.less';

export const Main: React.FC = () => {
  const { t } = useTranslation('main');
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <div className={styles.container}>
          <h1 className={styles.title}>{t('title')}</h1>
          <p className={styles.text}> {t('description')}</p>
          <Button>{t('join')}</Button>
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
