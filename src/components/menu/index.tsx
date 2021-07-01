import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { getIsAuth } from 'store/auth/selectors';
import cn from 'classnames';
import logo from 'assets/logo.png';
import Bell from 'assets/bell.svg';
import User from 'assets/user.svg';
import { Button } from 'components/common/button';
import styles from './styles.module.less';
import { useEffect } from 'react';

export const Menu: React.FC = () => {
  const { t } = useTranslation('menu');
  const location = useLocation();
  const auth = useSelector(getIsAuth);
  const [isOpenMenu, seIsOpenMenu] = useState(false);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    setIsAuth(
      auth ||
        (!!localStorage.getItem('uid') &&
          !!localStorage.getItem('access-token') &&
          !!localStorage.getItem('client')),
    );
  }, [auth]);

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

        <Link to={'/'} className={styles.logoWrapper}>
          <img src={logo} alt="authortie" className={styles.logo} />
        </Link>

        <div className={styles.itemsWrapper}>
          <span className={styles.item}>{t('analitics')}</span>
          <Link to={'/community'} className={styles.item}>
            {t('community')}
          </Link>
          <span className={styles.item}>{t('forBusiness')}</span>
        </div>

        <Link to="/application">
          <Button className={styles.btn}>{t('createRequest')}</Button>
        </Link>

        {isAuth ? (
          <>
            <Bell className={styles.icon} />
            <User className={styles.icon} />
            <Link to={'profile'} className={styles.userName}>
              User
            </Link>
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
