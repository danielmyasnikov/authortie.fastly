import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import { Button } from 'components/common/button';
import { Card } from 'components/common/card';
import Arrow from 'assets/arrow.svg';
import Example from 'assets/example.svg';
import Assessment from 'assets/assessment.svg';
import Group from 'assets/group.svg';
import Improve from 'assets/improve.svg';
import Enhance from 'assets/enhance.svg';
import styles from './styles.module.less';

export const Main: React.FC = () => {
  const { t } = useTranslation('main');
  const location = useLocation();
  const isAuth = !!localStorage.getItem('uid');

  const renderHowItsWork = () => (
    <div className={styles.howWorkWrapper}>
      <div>
        <div className={styles.howWorkBlock}>
          <Assessment className={styles.howWorkIcon} />
        </div>
        <p className={styles.howWorkText}> {t('point_1')}</p>
      </div>
      <Arrow className={styles.arrowIcon} />

      <div>
        <div className={styles.howWorkBlock}>
          <Group className={styles.howWorkIcon} />
        </div>
        <p className={styles.howWorkText}> {t('point_2')}</p>
      </div>
      <Arrow className={styles.arrowIcon} />

      <div>
        <div className={styles.howWorkBlock}>
          <Enhance className={styles.howWorkIcon} />
        </div>
        <p className={styles.howWorkText}> {t('point_3')}</p>
      </div>
      <Arrow className={styles.arrowIcon} />

      <div>
        <div className={styles.howWorkBlock}>
          <Improve className={styles.howWorkIcon} />
        </div>
        <p className={styles.howWorkText}> {t('point_4')}</p>
      </div>
    </div>
  );

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <div className={styles.containerHeader}>
          <h1 className={styles.title}>{t('title')}</h1>
          <p className={styles.text}>{t('description')}</p>
          {!isAuth && (
            <Link
              to={{
                pathname: 'authorization',
                state: { background: location },
              }}
            >
              <Button className={styles.headerBtn}>{t('join')}</Button>
            </Link>
          )}
        </div>
        <div className={styles.bgImg} />
      </div>

      <div className={styles.landingWrapper}>
        <div className={styles.container}>
          <h2 className={styles.howItsWorkTitle}>{t('howItsWork')}</h2>
          {renderHowItsWork()}

          <h2 className={styles.communityTitle}>{t('community')}</h2>
          <p className={styles.communityAbout}>{t('aboutCommunity')}</p>

          <div className={styles.cards}>
            <Card />
            <Card />
            <Card />
            <Card />
          </div>
        </div>
      </div>
    </div>
  );
};
