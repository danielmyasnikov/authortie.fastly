import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import ChangePass from 'assets/changePass.svg';
import Leave from 'assets/leave.svg';
import Delete from 'assets/delete.svg';
import { RemoveProfileModal } from './modals/removeProfile';
import { LogoutModal } from './modals/logout';
import { ChangePassword } from './modals/changePassword';

import styles from './styles.module.less';

interface Props {
  privateAnc: boolean;
  notificationsEmail: boolean;
  notificationsBrow: boolean;
  setPrivateAnc: (value: boolean)=> void;
  setNotificationsEmail: (value: boolean)=> void;
  setNotificationsBrow: (value: boolean)=> void;
}

export const Widget: React.FC<Props> = ({
  privateAnc,
  notificationsEmail,
  notificationsBrow,
  setPrivateAnc,
  setNotificationsEmail,
  setNotificationsBrow,
}) => {
  const { t } = useTranslation('profile');
  const [isOpenRemove, setIsOpenRemove] = useState(false);
  const [isOpenLogout, setIsOpenLogout] = useState(false);
  const [isOpenChangePassword, setIsOpenChangePassword] = useState(false);

  return (
    <div className={styles.settings}>
      <div className={styles.chkbox}>
        <div>
          <input
            className={styles.checkboxInput}
            type="checkbox"
            name="privateAnc"
            id="privateAnc"
            checked={privateAnc}
            onChange={() => setPrivateAnc(!privateAnc)}
          />
          <label htmlFor="privateAnc">{t('privateAnc')}</label>
        </div>
        <div>
          <input
            className={styles.checkboxInput}
            type="checkbox"
            name="notificationsEmail"
            id="notificationsEmail"
            checked={notificationsEmail}
            onChange={() => setNotificationsEmail(!notificationsEmail)}
          />
          <label htmlFor="notificationsEmail">{t('notificationsEmail')}</label>
        </div>
        <div>
          <input
            className={styles.checkboxInput}
            type="checkbox"
            name="notificationsBrow"
            id="notificationsBrow"
            checked={notificationsBrow}
            onChange={() => setNotificationsBrow(!notificationsBrow)}
          />
          <label htmlFor="notificationsBrow">{t('notificationsBrow')}</label>
        </div>
      </div>
      <div className={styles.actions}>
        <div className={styles.item} onClick={() => setIsOpenChangePassword(true)}>
          <ChangePass />
          <span>Сменить пароль</span>
        </div>
        <div className={styles.item} onClick={() => setIsOpenLogout(true)}>
          <Leave />
          <span>Выйти из аккаунта</span>
        </div>
        <div className={styles.item} onClick={() => setIsOpenRemove(true)}>
          <Delete />
          <span>Удалить аккаунт</span>
        </div>
      </div>
      <RemoveProfileModal onClose={setIsOpenRemove} open={isOpenRemove} />
      <LogoutModal onClose={setIsOpenLogout} open={isOpenLogout} />
      <ChangePassword onClose={setIsOpenChangePassword} open={isOpenChangePassword} />
    </div>
  );
};
