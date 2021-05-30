import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { AppDispatch } from 'store/types';
import { useTranslation } from 'react-i18next';
import { Button } from 'components/common/button';
import Exit from 'assets/exit.svg';
import Checkmark from 'assets/checkmark.svg';

import { getRegistration, getSignIn } from 'store/auth/actions';

import styles from './styles.module.less';

export const Registration: React.FC = () => {
  const { t } = useTranslation('auth');
  const dispatch: AppDispatch = useDispatch();
  const history = useHistory();
  const [isRegistration, setIsRegistration] = useState<boolean>(false);
  const [isConfirm, setIsConfirm] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');
  const [passwordConfirmationError, setPasswordConfirmationError] = useState<string>('');
  const [emailError, setEmailError] = useState<string>('');

  function onClose() {
    history.goBack();
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { value, name } = e.target;
    switch (name) {
      case 'email':
        setEmail(value);
        setEmailError('');
        break;
      case 'password':
        setPasswordError('');
        setPassword(value);
        break;
      case 'repeatPassword':
        setPasswordConfirmationError('');
        setPasswordConfirmation(value);
        break;
      default:
        return undefined;
    }
  }

  function toAuthor() {
    setIsRegistration(false);
    setIsConfirm(false);
  }

  function onSubmit() {
    isRegistration ? registration() : signIn();
  }

  async function signIn() {
    const resultConf = await dispatch(getSignIn({ email, password }));

    if (getRegistration.rejected.match(resultConf) && resultConf.payload) {
      setEmailError(resultConf.payload.emailError[0]);
      setPasswordError(resultConf.payload.passwordError[0]);
    } else {
      history.push('/');
    }
  }

  async function registration() {
    const resultConf = await dispatch(getRegistration({ email, password, passwordConfirmation }));

    if (getRegistration.rejected.match(resultConf) && resultConf.payload) {
      setEmailError(resultConf.payload.emailError[0]);
      setPasswordError(resultConf.payload.passwordError[0]);
      resultConf.payload.passwordConfirmationError &&
        setPasswordConfirmationError(resultConf.payload.passwordConfirmationError[0]);
    } else {
      setIsConfirm(true);
    }
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.overlay} onClick={onClose} />
      <div className={styles.contaier}>
        <Exit className={styles.exit} onClick={onClose} />
        {isConfirm ? (
          <div className={styles.confirmWrapper}>
            <Checkmark className={styles.confirmTitle} />
            <div className={styles.btnWrapper}>
              <Button className={styles.btn} onClick={onClose}>
                {t('toMain')}
              </Button>
              <Button className={styles.btn}>{t('toProfile')}</Button>
            </div>
          </div>
        ) : (
          <>
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
              <div className={styles.error}>{emailError}</div>
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
              <div className={styles.error}>{passwordError}</div>
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
                <div className={styles.error}>{passwordConfirmationError}</div>
              </div>
            )}
            <Button onClick={onSubmit}>{isRegistration ? t('logup') : t('login')}</Button>
          </>
        )}
      </div>
    </div>
  );
};
