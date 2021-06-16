import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import cn from 'classnames';
import { AppDispatch } from 'store/types';
import { useTranslation } from 'react-i18next';
import { Button } from 'components/common/button';
import Close from 'assets/close.svg';
import Eye from 'assets/eye.svg';
import CloseEye from 'assets/closeEye.svg';
import FacebookColor from 'assets/facebookColor.svg';
import IDColor from 'assets/IDColor.svg';
import GoogleColor from 'assets/googleColor.svg';

import Checkmark from 'assets/checkmark.svg';

import { getRegistration, getSignIn } from 'store/auth/actions';

import styles from './styles.module.less';

export const Registration: React.FC = () => {
  const { t } = useTranslation('auth');
  const dispatch: AppDispatch = useDispatch();
  const history = useHistory();
  const [isRegistration, setIsRegistration] = useState<boolean>(false);
  const [isConfirm, setIsConfirm] = useState<boolean>(false);
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);
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
  {
    /* {isConfirm ? (
    <div className={styles.confirmWrapper}>
      <Checkmark className={styles.confirmTitle} />
      <div className={styles.btnWrapper}>
        <Button className={styles.btn} onClick={onClose}>
          {t('toMain')}
        </Button>
        <Button className={styles.btn}>{t('toProfile')}</Button>
      </div>
    </div>
  ) : ( */
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.overlay} onClick={onClose} />
      <div className={styles.contaier}>
        <Close className={styles.exit} onClick={onClose} />

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

        <div className={cn(styles.inputWrapper, { [styles.inputWrapperError]: !!emailError })}>
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
        <div className={styles.error}>{emailError}</div>

        <div className={cn(styles.inputWrapper, { [styles.inputWrapperError]: !!passwordError })}>
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
        <div className={styles.error}>{passwordError}</div>

        {isRegistration && (
          <>
            <div
              className={cn(styles.inputWrapper, {
                [styles.inputWrapperError]: !!passwordConfirmationError,
              })}
            >
              <input
                placeholder={t('repeatPassword')}
                value={passwordConfirmation}
                name="repeatPassword"
                id="repeatPassword"
                className={styles.input}
                type={isShowPassword ? 'text' : 'password'}
                onChange={handleChange}
              />
              <div
                onClick={() => setIsShowPassword(!isShowPassword)}
                className={styles.showPassword}
              >
                {isShowPassword ? <Eye /> : <CloseEye />}
              </div>
            </div>
            <div className={styles.error}>{passwordConfirmationError}</div>
          </>
        )}
        {!isRegistration && (
          <span className={styles.forgotYourPassword}>{t('forgotYourPassword')}</span>
        )}

        {isRegistration && (
          <div className={styles.checkWrapper}>
            <label className={styles.checkbox} htmlFor="element">
              <input type="checkbox" id="element" />
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

        <Button className={styles.btn} onClick={onSubmit}>
          {isRegistration ? t('logup') : t('login')}
        </Button>

        <span className={styles.loginWithTitle}>{t('loginWith')}</span>
        <div className={styles.iconsWrapper}>
          {/* <div className={styles.icon}> */}
          <FacebookColor />
          {/* </div>
          <div className={styles.bigIcon}> */}
          <IDColor />
          {/* </div>
          <div className={styles.icon}> */}
          <GoogleColor />
          {/* </div> */}
        </div>
      </div>
    </div>
  );
};
