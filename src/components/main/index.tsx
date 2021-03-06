import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'components/common/button';
import { Card } from 'components/common/card';
import { getIsAuth } from 'store/auth/selectors';
import { authSlice } from 'store/auth/slice';
import { getPostingsMain } from 'store/main/actions';
import { getPostingsMainSelector } from 'store/main/selectors';
import Arrow from 'assets/arrow.svg';
import { Footer } from 'components/footer';
import Assessment from 'assets/assessment.png';
import Group from 'assets/group.png';
import Improve from 'assets/improve.png';
import Enhance from 'assets/enhance.png';
import styles from './styles.module.less';

export const Main: React.FC = () => {
  const { t } = useTranslation('main');
  const dispatch = useDispatch();
  const location = useLocation();
  const isAuth = useSelector(getIsAuth);
  const { postings } = useSelector(getPostingsMainSelector);
  const [publications, setPublications] = useState<any[]>([]);

  useEffect(() => {
    dispatch(getPostingsMain());
  }, []);

  useEffect(() => {
    setPublications(postings);
  }, [postings]);

  const renderHowItsWork = () => (
    <div className={styles.howWorkWrapper}>
      <div>
        <div className={styles.howWorkBlock}>
          <img src={Assessment} alt="" className={styles.howWorkIcon} />
        </div>
        <p className={styles.howWorkText}> {t('point_1')}</p>
      </div>
      <Arrow className={styles.arrowIcon} />

      <div>
        <div className={styles.howWorkBlock}>
          <img src={Group} alt="" className={styles.howWorkIcon} />
        </div>
        <p className={styles.howWorkText}> {t('point_2')}</p>
      </div>
      <Arrow className={styles.arrowIcon} />

      <div>
        <div className={styles.howWorkBlock}>
          <img src={Improve} alt="" className={styles.howWorkIcon} />
        </div>
        <p className={styles.howWorkText}> {t('point_3')}</p>
      </div>
      <Arrow className={styles.arrowIcon} />

      <div>
        <div className={styles.howWorkBlock}>
          <img src={Enhance} alt="" className={styles.howWorkIcon} />
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
              className={styles.btnLink}
              to={{
                pathname: '/authorization',
                state: { background: location },
              }}
              onClick={() => dispatch(authSlice.actions.setRegistrationTab(true))}
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
            {!!publications.length &&
              publications.map((item: any) => (
                <React.Fragment key={item.id + item.title}>
                  <Card post={item} />
                </React.Fragment>
              ))}
          </div>
          <div className={styles.goToCommunityWrapper}>
            <Link to="/community">
              <Button className={styles.btnCommunity}>{t('shawAll')}</Button>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
