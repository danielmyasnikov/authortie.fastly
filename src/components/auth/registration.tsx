import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import cn from 'classnames';
import { AppDispatch } from 'store/types';
import { useTranslation } from 'react-i18next';
import { Button } from 'components/common/button';
import Close from 'assets/close.svg';
import Eye from 'assets/eye.svg';
import CloseEye from 'assets/closeEye.svg';
import FacebookColor from 'assets/facebookColor.png';
import { getProfile } from 'store/profile/actions';

import GoogleColor from 'assets/googleColor.png';
import Coolicon from 'assets/coolicon.svg';

import logo from 'assets/logo.png';

import { getRegistration, getSignIn } from 'store/auth/actions';

import styles from './styles.module.less';

export const Registration: React.FC = () => {
  const location = useLocation();
  // @ts-ignore
  const { pathname } = location.state && location.state.background;
  const { t } = useTranslation('auth');
  const dispatch: AppDispatch = useDispatch();
  const history = useHistory();
  const originPath = window.origin;
  const [isRegistration, setIsRegistration] = useState<boolean>(false);
  const [isConfirm, setIsConfirm] = useState<boolean>(false);
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>('');
  const [error, setError] = useState('');
  const [check, setCheck] = useState(false);
  const googleURL = `https://authortie-app.herokuapp.com/auth/google_oauth2?front_url=${originPath}${pathname}`;
  const facebookURL = `https://authortie-app.herokuapp.com/auth/facebook?front_url=${originPath}${pathname}`;

  function onClose() {
    history.goBack();
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { value, name } = e.target;
    switch (name) {
      case 'email':
        setEmail(value);
        setError('');
        break;
      case 'password':
        setError('');
        setPassword(value);
        break;
      case 'repeatPassword':
        setError('');
        setPasswordConfirmation(value);
        break;
      default:
        return undefined;
    }
  }

  function onSubmit() {
    isRegistration ? registration() : signIn();
  }

  async function signIn() {
    const resultConf = await dispatch(getSignIn({ email, password }));
    if (getSignIn.rejected.match(resultConf) && resultConf.payload) {
      setError(resultConf.payload);
    } else {
      history.goBack();
      dispatch(getProfile());
    }
  }

  async function registration() {
    const resultConf = await dispatch(getRegistration({ email, password, passwordConfirmation }));

    if (getRegistration.rejected.match(resultConf) && resultConf.payload) {
      setError(resultConf.payload);
    } else {
      setIsConfirm(true);
    }
  }

  const renderConfirm = () => (
    <div className={styles.confirmWrapper}>
      <Coolicon className={styles.confirmTitle} />
      <span className={styles.confirmTitle}>{t('thankYouForRegistering')}</span>
      <div className={styles.btnWrapper}>
        <Button className={styles.btnConfirm} onClick={onClose}>
          {t('toMain')}
        </Button>
        <Button className={styles.btnConfirm}>{t('toProfile')}</Button>
      </div>
    </div>
  );

  const renderAuth = () => (
    <>
      <div className={styles.titleWrapper}>
        <button
          onClick={() => setIsRegistration(!isRegistration)}
          className={cn(styles.title, { [styles.titleFocus]: !isRegistration })}
        >
          {t('authorization')}
        </button>
        <button
          onClick={() => setIsRegistration(!isRegistration)}
          className={cn(styles.title, { [styles.titleFocus]: isRegistration })}
        >
          {t('registration')}
        </button>
      </div>

      <div className={styles.inputWrapper}>
        <input
          placeholder={t('email')}
          value={email}
          name="email"
          id="email"
          className={styles.input}
          type="text"
          onChange={handleChange}
        />
      </div>

      <div className={styles.inputWrapper}>
        <input
          placeholder={t('password')}
          value={password}
          name="password"
          id="password"
          className={styles.input}
          type={isShowPassword ? 'text' : 'password'}
          onChange={handleChange}
        />
        <div onClick={() => setIsShowPassword(!isShowPassword)} className={styles.showPassword}>
          {isShowPassword ? <Eye /> : <CloseEye />}
        </div>
      </div>

      {isRegistration && (
        <>
          <div className={styles.inputWrapper}>
            <input
              placeholder={t('repeatPassword')}
              value={passwordConfirmation}
              name="repeatPassword"
              id="repeatPassword"
              className={styles.input}
              type={isShowPassword ? 'text' : 'password'}
              onChange={handleChange}
            />
            <div onClick={() => setIsShowPassword(!isShowPassword)} className={styles.showPassword}>
              {isShowPassword ? <Eye /> : <CloseEye />}
            </div>
          </div>
        </>
      )}
      {!isRegistration && (
        <span className={styles.forgotYourPassword}>{t('forgotYourPassword')}</span>
      )}

      {isRegistration && (
        <div className={styles.checkWrapper}>
          <label className={styles.checkbox} htmlFor="element">
            <input checked={check} type="checkbox" id="element" onClick={() => setCheck(!check)} />
            <span>
              <div className={styles.check} />
            </span>
          </label>
          <div className={styles.checkText}>
            <span>{t('text1Check')} </span>
            <a className={styles.checkLink} href="#">
              <span>{t('text2Check')} </span>
            </a>
            {t('text3Check')}
            <a className={styles.checkLink} href="#">
              {t('text4Check')}
            </a>
            .
          </div>
        </div>
      )}

      <Button
        className={cn(styles.btn, { [styles.disabled]: isRegistration && !check })}
        onClick={onSubmit}
        disabled={isRegistration && !check}
      >
        {isRegistration ? t('logup') : t('login')}
      </Button>

      <div className={styles.error}>{error}</div>

      <span className={styles.loginWithTitle}>{t('loginWith')}</span>
      <div className={styles.iconsWrapper}>
        <a href={facebookURL} className={styles.icon}>
          <img src={FacebookColor} alt="" />
        </a>
        <a href={googleURL} className={styles.icon}>
          <img src={GoogleColor} alt="" />
        </a>
      </div>
    </>
  );

  return (
    <div className={styles.wrapper}>
      <div className={styles.overlay} onClick={onClose} />
      <div className={styles.contaier}>
        <Close className={styles.exit} onClick={onClose} />
        <div className={styles.logoWrapper}>
          <img src={logo} alt="authortie" className={styles.logo} />
        </div>
        {isConfirm ? renderConfirm() : renderAuth()}
        <span onClick={onClose} className={styles.goToMainMob}>
          {t('goToMain')}
        </span>
      </div>
    </div>
  );
};
