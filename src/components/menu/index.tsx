import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { authSlice } from 'store/auth/slice';
import axios from 'axios';
import { getIsAuth } from 'store/auth/selectors';
import cn from 'classnames';
import logo from 'assets/logo.png';
import Bell from 'assets/bell.svg';
import User from 'assets/user.svg';
import Lang from 'assets/lang.svg';
import { getHeaders } from 'store/auth/selectors';
import { Button } from 'components/common/button';
import styles from './styles.module.less';
import { useEffect } from 'react';

export const Menu: React.FC = () => {
  const { t } = useTranslation('menu');
  const { i18n } = useTranslation();
  const dispatch = useDispatch();
  const location = useLocation();
  const auth = useSelector(getIsAuth);
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const [notifications, setNotifications] = useState<any[]>([]);
  const headers = useSelector(getHeaders);

  const changeLanguageHandler = (lang: string) => {
    i18n.changeLanguage(lang);
    localStorage.setItem('lang', lang);
  };

  useEffect(() => {
    setIsAuth(auth);
  }, [auth]);

  useEffect(() => {
    getNotifications();
    const lang = localStorage.getItem('lang');
    if (!!lang) changeLanguageHandler(lang);
  }, []);

  async function getNotifications() {
    const res = await axios({
      headers,
      url: `https://authortie-app.herokuapp.com/api/v1/notifications`,
    });
    setNotifications(res.data);
  }

  async function submitNotifications(id: string) {
    await axios({
      method: 'PATCH',
      headers,
      data: {
        ids: JSON.stringify(id),
      },
      url: `https://authortie-app.herokuapp.com/api/v1/notifications/bulk_update`,
    });
    getNotifications();
  }

  return (
    <div className={styles.wrapper}>
      <div className={cn(styles.itemsWrapperMobile, { [styles.openMenu]: isOpenMenu })}>
        <span className={styles.item}>{t('analitics')}</span>
        <Link to={'/community'} onClick={() => setIsOpenMenu(!isOpenMenu)} className={styles.item}>
          {t('community')}
        </Link>
        <span className={styles.item}>{t('forBusiness')}</span>
        <Link to="/application">
          <Button className={styles.btn}>{t('createRequest')}</Button>
        </Link>
      </div>

      <div className={styles.content}>
        <button
          className={cn(styles.burger, { [styles.active]: isOpenMenu })}
          onClick={() => setIsOpenMenu(!isOpenMenu)}
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
        <div className={styles.langWrap}>
          <Lang />
          <div className={styles.langList}>
            <span className={styles.langItem} onClick={() => changeLanguageHandler('ru')}>
              RU
            </span>
            <span className={styles.langItem} onClick={() => changeLanguageHandler('en')}>
              EN
            </span>
          </div>
        </div>

        {isAuth ? (
          <>
            <div className={styles.notificationsWrapper}>
              <Bell className={styles.icon} />
              {notifications.length > 0 && (
                <div className={styles.notifications}>{notifications.length}</div>
              )}

              {notifications.length > 0 && (
                <div className={styles.notificationsList}>
                  {notifications.map((item) => (
                    <Link
                      onClick={() => submitNotifications(item.id)}
                      className={styles.notificationsItem}
                      to={item.url}
                    >
                      <span> {`${item.message} ${item.ago}`}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link to={'/profile'} className={styles.userName}>
              <User className={styles.icon} />
            </Link>
          </>
        ) : (
          <Link
            to={{
              pathname: '/authorization',
              state: { background: location },
            }}
            className={styles.userName}
            onClick={() => dispatch(authSlice.actions.setRegistrationTab(false))}
          >
            {t('singIn')}
          </Link>
        )}
      </div>
    </div>
  );
};
