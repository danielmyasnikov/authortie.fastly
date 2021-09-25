import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router';
import cn from 'classnames';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { getHeaders } from 'store/auth/selectors';
import Eye from 'assets/eye.svg';
import CloseEye from 'assets/closeEye.svg';
import { Modal } from 'components/common/modal';
import { Button } from 'components/common/button';
import styles from './styles.module.less';

interface Props {
  onClose: (value: boolean) => void;
  open: boolean;
}

export const ChangePassword: React.FC<Props> = ({ onClose, open }) => {
  const history = useHistory();
  const [passwordError, setPasswordError] = useState<string>('');
  const [newPasswordError, setNewPasswordError] = useState<string>('');
  const [newPasswordConfirmationError, setNewPasswordConfirmationError] = useState<string>('');

  const [password, setPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [newPasswordConfirmation, setNewPasswordConfirmation] = useState<string>('');
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);
  const [isShowNewPassword, setIsShowNewPassword] = useState<boolean>(false);
  const [isConf, setIsConf] = useState(false);
  const headers = useSelector(getHeaders);

  const { t } = useTranslation('profile');

  function closeModal() {
    onClose(false);
  }

  async function submitPasswords() {
    const data = {
      current_password: password,
      password: newPassword,
      password_confirmation: newPasswordConfirmation,
    };
    try {
      await axios({
        method: 'PATCH',
        headers,
        data,
        url: 'https://authortie-app.herokuapp.com//auth',
      });
      setIsConf(true);
    } catch (err: any) {
      setPasswordError(err.response.data.errors.current_password || '');
      setNewPasswordError(err.response.data.errors.password || '');
      setNewPasswordConfirmationError(err.response.data.errors.password_confirmation || '');
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { value, name } = e.target;

    switch (name) {
      case 'password':
        setPassword(value);
        setPasswordError('');
        break;
      case 'newPassword':
        setNewPasswordError('');
        setNewPassword(value);
        break;
      case 'newPasswordConfirmation':
        setNewPasswordConfirmationError('');
        setNewPasswordConfirmation(value);
        break;
      default:
        return undefined;
    }
  }

  const renderConf = () => (
    <>
      <span className={styles.subtitle}>Пароль успешно изменен</span>
      <Button onClick={closeModal}>Закрыть</Button>
    </>
  );

  const renderInputs = () => (
    <>
      <span className={styles.subtitle}>Смена пароля</span>

      <div
        className={cn(styles.inputWrapper, {
          [styles.inputWrapperError]: !!passwordError,
        })}
      >
        <input
          placeholder={t('Введите текущий пароль')}
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

      <div
        className={cn(styles.inputWrapper, {
          [styles.inputWrapperError]: !!newPasswordError,
        })}
      >
        <input
          placeholder={t('Введите новы пароль')}
          value={newPassword}
          name="newPassword"
          id="newPassword"
          className={styles.input}
          type={isShowNewPassword ? 'text' : 'password'}
          onChange={handleChange}
        />
        <div
          onClick={() => setIsShowNewPassword(!isShowNewPassword)}
          className={styles.showPassword}
        >
          {isShowNewPassword ? <Eye /> : <CloseEye />}
        </div>
      </div>
      <div className={styles.error}>{newPasswordError}</div>

      <div
        className={cn(styles.inputWrapper, {
          [styles.inputWrapperError]: !!newPasswordConfirmationError,
        })}
      >
        <input
          placeholder={t('Повторите новый пароль')}
          value={newPasswordConfirmation}
          name="newPasswordConfirmation"
          id="newPasswordConfirmation"
          className={styles.input}
          type={isShowNewPassword ? 'text' : 'password'}
          onChange={handleChange}
        />
        <div
          onClick={() => setIsShowNewPassword(!isShowNewPassword)}
          className={styles.showPassword}
        >
          {isShowNewPassword ? <Eye /> : <CloseEye />}
        </div>
      </div>
      <div className={styles.error}>{newPasswordConfirmationError}</div>
      <Button onClick={submitPasswords}>Сохранить</Button>
    </>
  );

  return (
    <Modal open={open} onClose={closeModal}>
      {!isConf ? renderInputs() : renderConf()}
    </Modal>
  );
};
