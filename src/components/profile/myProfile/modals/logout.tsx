import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { authSlice } from 'store/auth/slice';
import { Modal } from 'components/common/modal';
import { Button } from 'components/common/button';
import React from 'react';
import styles from './styles.module.less';

interface Props {
  onClose: (value: boolean) => void;
  open: boolean;
}

export const LogoutModal: React.FC<Props> = ({ onClose, open }) => {
  const history = useHistory();
  const dispatch = useDispatch();

  function closeModal() {
    onClose(false);
  }

  async function logout() {
    localStorage.removeItem('client');
    localStorage.getItem('access-token');
    localStorage.getItem('uid');
    closeModal();
    dispatch(authSlice.actions.getLogout());
    history.push('/');
  }

  return (
    <Modal open={open} onClose={closeModal}>
      <span className={styles.subtitle}>Вы уверены что хотите выйти?</span>
      <Button onClick={logout} className={styles.btn}>
        Выйти
      </Button>
      <Button onClick={closeModal}>Отмена</Button>
    </Modal>
  );
};
