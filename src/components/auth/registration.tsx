import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from 'components/common/button';
import Exit from 'assets/exit.svg';

import { getRegistration } from 'store/auth/actions';

import styles from './styles.module.less';

export const Registration: React.FC = () => {
  const { t } = useTranslation('auth');
  const dispatch = useDispatch();
  const history = useHistory();
  const [isRegistration, setIsRegistration] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>('');

  function onClose() {
    history.goBack();
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { value, name } = e.target;
    switch (name) {
      case 'email':
        return setEmail(value);
      case 'password':
        return setPassword(value);
      case 'repeatPassword':
        return setPasswordConfirmation(value);

      default:
        return undefined;
    }
  }
  function onSubmit() {
    dispatch(getRegistration({ email, password, passwordConfirmation }));
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.contaier}>
        <Exit className={styles.exit} onClick={onClose} />

        <span className={styles.title}>
          {isRegistration ? t('registration') : t('authorization')}
        </span>

        <span onClick={() => setIsRegistration(!isRegistration)} className={styles.link}>
          {isRegistration ? t('authorization') : t('registration')}
        </span>

        <div className={styles.inputWrapper}>
          <label className={styles.label} htmlFor="email">
            {t('email')}
          </label>
          <input
            value={email}
            name="email"
            id="email"
            className={styles.input}
            type="text"
            onChange={handleChange}
          />
        </div>

        <div className={styles.inputWrapper}>
          <label className={styles.label} htmlFor="password">
            {t('password')}
          </label>
          <input
            value={password}
            name="password"
            id="password"
            className={styles.input}
            type="password"
            onChange={handleChange}
          />
        </div>

        {isRegistration && (
          <div className={styles.inputWrapper}>
            <label className={styles.label} htmlFor="repeatPassword">
              {t('repeatPassword')}
            </label>
            <input
              value={passwordConfirmation}
              name="repeatPassword"
              id="repeatPassword"
              className={styles.input}
              type="password"
              onChange={handleChange}
            />
          </div>
        )}
        <Button onClick={onSubmit}>{isRegistration ? t('logup') : t('login')}</Button>
      </div>
    </div>
  );
};
