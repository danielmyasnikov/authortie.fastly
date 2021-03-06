import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation, Link } from 'react-router-dom';
import cn from 'classnames';
import { AppDispatch } from 'store/types';
import { useTranslation } from 'react-i18next';
import { Button } from 'components/common/button';
import { Status } from 'components/common/status';
import Close from 'assets/close.svg';
import Eye from 'assets/eye.svg';
import CloseEye from 'assets/closeEye.svg';
import NoteModal from 'assets/note.svg';
import FacebookColor from 'assets/facebookColor.png';
import LinkedinColor from 'assets/linkedinColor.png';
import { getProfile } from 'store/profile/actions';
import { getCreatePost } from 'store/request/selectors';
import { getRegistrationTab } from 'store/auth/selectors';
import { createPost as createPostSlice } from 'store/request/slice';
import { createPostingsApp } from 'store/request/actions';
import * as T from 'store/profile/types';
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
  const isRegTab = useSelector(getRegistrationTab);
  const history = useHistory();
  const originPath = window.origin;
  const [isRegistration, setIsRegistration] = useState<boolean>(isRegTab);
  const [isConfirm, setIsConfirm] = useState<boolean>(false);
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>('');
  const [statusError, setStatusError] = useState<string>('');
  const [status, setStatus] = useState<any>('');
  const [grade, setGrade] = useState<any>('');

  const [passwordError, setPasswordError] = useState<string>('');
  const [passwordConfirmationError, setPasswordConfirmationError] = useState<string>('');
  const [emailError, setEmailError] = useState<string>('');
  const [error, setError] = useState('');
  const [check, setCheck] = useState(false);
  const googleURL = `https://authortie-app.herokuapp.com/auth/google_oauth2?front_url=${originPath}${pathname}`;
  const facebookURL = `https://authortie-app.herokuapp.com/auth/facebook?front_url=${originPath}${pathname}`;
  const linkedinURL = `https://authortie-app.herokuapp.com/auth/linkedin?front_url=${originPath}${pathname}`;

  const { dataArray, errorIndex, isSubmitData } = useSelector(getCreatePost);

  function onClose() {
    history.goBack();
    dispatch(createPostSlice.actions.getSubmitData(false));
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

  const onFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target?.value !== '') {
      setStatusError('');
    }
  };

  function onSubmit() {
    isRegistration ? registration() : signIn();
  }

  async function signIn() {
    const resultConf = await dispatch(getSignIn({ email, password }));
    if (getSignIn.rejected.match(resultConf) && resultConf.payload) {
      setError(resultConf.payload);
    } else if (!errorIndex.length && !!dataArray && isSubmitData) {
      const resultConf = await dispatch(createPostingsApp(dataArray));
      if (createPostingsApp.fulfilled.match(resultConf)) {
        setIsConfirm(true);
        dispatch(createPostSlice.actions.getSubmitData(false));
      }
    } else {
      history.goBack();
      dispatch(getProfile());
    }
  }

  async function registration() {
    const resultConf = await dispatch(
      getRegistration({
        email,
        password,
        passwordConfirmation,
        degree: status.value,
        degreeCategory: grade.value,
      }),
    );
    if (getRegistration.rejected.match(resultConf) && resultConf.payload) {
      setEmailError(resultConf.payload.emailError[0]);
      setPasswordError(resultConf.payload.passwordError[0]);
      resultConf.payload.passwordConfirmationError &&
        setPasswordConfirmationError(resultConf.payload.passwordConfirmationError[0]);
      resultConf.payload.fullMessagesError && setError(resultConf.payload.fullMessagesError[0]);
    } else {
      if (!isSubmitData) setIsConfirm(true);
      if (!errorIndex.length && !!dataArray && isSubmitData) {
        const resultConfData = await dispatch(createPostingsApp(dataArray));
        if (createPostingsApp.rejected.match(resultConfData) && resultConfData.payload) {
          setIsConfirm(false);
          setError('?????????????????? ???????????? ?????? ???????????????? ????????????');
        } else {
          setIsConfirm(true);
          dispatch(createPostSlice.actions.getSubmitData(true));
        }
      }
    }
  }


  function handleAuthType() {
    setIsRegistration(!isRegistration);
    setPasswordError('');
    setPasswordConfirmationError('');
    setEmailError('');
    setError('');
  }

  const renderConfirm = () => (
    <div className={styles.confirmWrapper}>
      {!isSubmitData ? (
        <>
          <Coolicon className={styles.confirmTitle} />
          <span className={styles.confirmTitle}>{t('thankYouForRegistering')}</span>
          <div className={styles.btnWrapper}>
            <Button className={styles.btnConfirm} onClick={onClose}>
              {t('toMain')}
            </Button>
            <Link to="/profile" className={styles.userName}>
              <Button className={styles.btnConfirm}>{t('toProfile')}</Button>
            </Link>
          </div>
        </>
      ) : (
        <>
          <NoteModal className={styles.noteIcon} />
          <span className={styles.confirmTitle}>???????????? ????????????????????????!</span>
          <span className={styles.modalInfo}>
            ???????? ???????????? ???????????????????? ???? ??????????????????. ?????????? ???????????????? ?????? ???????????? ???????????????????? ?? ????
            ????????????????????.
          </span>

          <Link to="/community">
            <Button>?????????????? ?? ??????????????</Button>
          </Link>

          <Link to="/">
            <Button className={styles.btnBorder}>???? ??????????????</Button>
          </Link>
        </>
      )}
    </div>
  );

  const renderAuth = () => (
    <>
      <div className={styles.titleWrapper}>
        <button
          onClick={handleAuthType}
          className={cn(styles.title, { [styles.titleFocus]: !isRegistration })}
        >
          {t('authorization')}
        </button>
        <button
          onClick={handleAuthType}
          className={cn(styles.title, { [styles.titleFocus]: isRegistration })}
        >
          {t('registration')}
        </button>
      </div>
      {isRegistration && (
        <>
          <div className={cn(styles.statusWrapper, { [styles.statusWrapperError]: !!statusError})}>
            <Status
              classNamePrefix="RegistrationSelect"
              onChange={(option: any) => {
                setGrade('');
                setStatus(option);
              }}
              className={styles.status}
              isStatus={true}
              placeholder="????????????"
            />
          </div>
          <div className={styles.error}>{isRegistration && statusError}</div>
        </>
      )}
      {isRegistration && status?.value && (
        <>
          <div className={cn(styles.statusWrapper, { [styles.statusWrapperError]: !!statusError})}>
            <Status
              classNamePrefix={`RegistrationSelect`}
              isStatus={false}
              status={status}
              value={grade}
              onChange={(option: any) => {
                setGrade(option);
                onFormChange(option);
              }}
              placeholder="????????????"
            />
          </div>
          <div className={styles.error}>{statusError}</div>
        </>
      )}
      <div
        className={cn(styles.inputWrapper, {
          [styles.inputWrapperError]: !!emailError && isRegistration,
        })}
      >
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
      <div className={styles.error}>{isRegistration && emailError}</div>

      <div
        className={cn(styles.inputWrapper, {
          [styles.inputWrapperError]: !!passwordError && isRegistration,
        })}
      >
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
      <div className={styles.error}>{isRegistration && passwordError}</div>

      {isRegistration && (
        <>
          <div
            className={cn(styles.inputWrapper, {
              [styles.inputWrapperError]: !!passwordConfirmationError && isRegistration,
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
            <div onClick={() => setIsShowPassword(!isShowPassword)} className={styles.showPassword}>
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

      <div className={styles.errorBottom}>{error}</div>

      <span className={styles.loginWithTitle}>{t('loginWith')}</span>
      <div className={styles.iconsWrapper}>
        <a href={facebookURL} className={styles.icon}>
          <img src={FacebookColor} alt="" />
        </a>
        <a href={googleURL} className={styles.icon}>
          <img src={GoogleColor} alt="" />
        </a>
        <a href={linkedinURL} className={styles.icon}>
          <img src={LinkedinColor} alt="" />
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
