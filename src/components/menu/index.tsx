import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import cn from 'classnames';
import logo from 'assets/logo.png';
import Bell from 'assets/bell.svg';
import User from 'assets/user.svg';
import { Button } from 'components/common/button';
import styles from './styles.module.less';

export const Menu: React.FC = () => {
  const { t } = useTranslation('menu');
  const location = useLocation();
  const isAuth = !!localStorage.getItem('uid');
  const [isOpenMenu, seIsOpenMenu] = useState(false);

  return (
    <div className={styles.wrapper}>
      <div className={cn(styles.itemsWrapperMobile, { [styles.openMenu]: isOpenMenu })}>
        <span className={styles.item}>{t('analitics')}</span>
        <span className={styles.item}>{t('community')}</span>
        <span className={styles.item}>{t('forBusiness')}</span>
      </div>

      <div className={styles.content}>
        <button
          className={cn(styles.burger, { [styles.active]: isOpenMenu })}
          onClick={() => seIsOpenMenu(!isOpenMenu)}
          type="button"
        >
          <span className={styles.burgerItem}></span>
        </button>

        <div className={styles.logoWrapper}>
          <img src={logo} alt="authortie" className={styles.logo} />
        </div>

        <div className={styles.itemsWrapper}>
          <span className={styles.item}>{t('analitics')}</span>
          <span className={styles.item}>{t('community')}</span>
          <span className={styles.item}>{t('forBusiness')}</span>
        </div>

        <Button className={styles.btn}>{t('createRequest')}</Button>
        <Bell className={styles.icon} />

        {isAuth ? (
          <>
            <User className={styles.icon} />
            <span className={styles.userName}>User</span>
          </>
        ) : (
          <Link
            to={{
              pathname: 'authorization',
              state: { background: location },
            }}
            className={styles.userName}
          >
            {t('singIn')}
          </Link>
        )}
      </div>
    </div>
  );
};
