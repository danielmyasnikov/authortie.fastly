import React from 'react';
import axios from 'axios';
import { useHistory } from 'react-router';
import { useSelector } from 'react-redux';
import { getHeaders } from 'store/auth/selectors';
import { Modal } from 'components/common/modal';
import { Button } from 'components/common/button';
import styles from './styles.module.less';

interface Props {
  onClose: (value: boolean) => void;
  open: boolean;
}

export const RemoveProfileModal: React.FC<Props> = ({ onClose, open }) => {
  const history = useHistory();
  const headers = useSelector(getHeaders);
  
  function closeModal() {
    onClose(false);
  }

  async function remove() {
    await axios({
      headers,
      url: `https://authortie-app.herokuapp.com/api/v1/profiles/delete`,
    });
    localStorage.removeItem('client');
    localStorage.getItem('access-token');
    localStorage.getItem('uid');
    closeModal();
    history.push('/');
  }

  return (
    <Modal open={open} onClose={closeModal}>
      <span className={styles.subtitle}>{'Вы уверены что хотите удалить профиль?'}</span>
      <Button onClick={remove} className={styles.btn}>
        Удалить профиль
      </Button>
      <Button onClick={closeModal}>Отмена</Button>
    </Modal>
  );
};
