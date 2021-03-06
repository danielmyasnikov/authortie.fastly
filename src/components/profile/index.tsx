import { Footer } from 'components/footer';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import cn from 'classnames';

import { MyProfile } from './myProfile';
import { MainPosts } from './mainPosts';
import { MainReview } from './mainReview';
import styles from './styles.module.less';

enum Item {
  MAIN = 'main',
  PROFILE = 'profile',
  REVIEW = 'review',
}

interface Params {
  id: string;
}

export const Profile = () => {
  const [itemNavbar, setItemNavbar] = useState(Item.PROFILE);
  const { t } = useTranslation('profile');
  const params = useParams<Params>();
  const renderProfile = () => {
    switch (itemNavbar) {
      case Item.PROFILE:
        return <MyProfile id={params?.id} />;
      case Item.MAIN:
        return <MainPosts id={params?.id} />;
      case Item.REVIEW:
        return <MainReview id={params?.id} />;
      default:
        break;
    }
  };
  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <div className={`${styles.rowBtnContainer} ${styles.rowContainer}`}>
          <div className={styles.headerBtns}>
            <button
              className={cn(styles.headerBtn, {
                [styles.headerBtnFocus]: itemNavbar === Item.PROFILE,
              })}
              onClick={() => setItemNavbar(Item.PROFILE)}
            >
              {t('title')}
            </button>
            <button
              className={cn(styles.headerBtn, {
                [styles.headerBtnFocus]: itemNavbar === Item.MAIN,
              })}
              onClick={() => setItemNavbar(Item.MAIN)}
            >
              {t('mainApp')}
            </button>
            <button
              className={cn(styles.headerBtn, {
                [styles.headerBtnFocus]: itemNavbar === Item.REVIEW,
              })}
              onClick={() => setItemNavbar(Item.REVIEW)}
            >
              {t('reviews')}
            </button>
          </div>
        </div>
        <div className={styles.container}>{renderProfile()}</div>
      </div>

      <div className={styles.footer}>
        <Footer />
      </div>
    </div>
  );
};
