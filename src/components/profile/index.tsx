import { Footer } from 'components/footer';
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

export const Profile = () => {
  const [itemNavbar, setItemNavbar] = useState(Item.PROFILE);
  const { t } = useTranslation('profile');

  const renderProfile = () => {
    switch (itemNavbar) {
      case Item.PROFILE:
        return <MyProfile />;
      case Item.MAIN:
        return <MainPosts />;
      case Item.REVIEW:
        return <MainReview />;
      default:
        break;
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <div className={styles.navBarWrapper}>
          <span
            className={cn(styles.navBarItem, { [styles.active]: itemNavbar === Item.PROFILE })}
            onClick={() => setItemNavbar(Item.PROFILE)}
          >
            {t('title')}
          </span>
          <span
            className={cn(styles.navBarItem, { [styles.active]: itemNavbar === Item.MAIN })}
            onClick={() => setItemNavbar(Item.MAIN)}
          >
            {t('mainApp')}
          </span>
          <span
            className={cn(styles.navBarItem, { [styles.active]: itemNavbar === Item.REVIEW })}
            onClick={() => setItemNavbar(Item.REVIEW)}
          >
            {t('reviews')}
          </span>
        </div>
        {renderProfile()}
      </div>

      <div className={styles.footer}>
        <Footer />
      </div>
    </div>
  );
};
