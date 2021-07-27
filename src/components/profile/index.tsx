import { Footer } from 'components/footer';
import { useState } from 'react';
import cn from 'classnames';

import { MyProfile } from './myProfile';
import { MainPosts } from './mainPosts';
import styles from './styles.module.less';

enum Item {
  MAIN = 'main',
  PROFILE = 'profile',
}

export const Profile = () => {
  const [itemNavbar, setItemNavbar] = useState(Item.PROFILE);

  const renderProfile = () => {
    switch (itemNavbar) {
      case Item.PROFILE:
        return <MyProfile />;
      case Item.MAIN:
        return <MainPosts />;

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
            Личная информация
          </span>
          <span
            className={cn(styles.navBarItem, { [styles.active]: itemNavbar === Item.MAIN })}
            onClick={() => setItemNavbar(Item.MAIN)}
          >
            Мои заявки
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
