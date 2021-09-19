import React from 'react';
import axios from 'axios';
import { useHistory } from 'react-router';

import { Modal } from 'components/common/modal';
import { Button } from 'components/common/button';
import styles from './styles.module.less';

const client = localStorage.getItem('client');
const accessToken = localStorage.getItem('access-token');
const uid = localStorage.getItem('uid');

const headers = { client, uid, ['access-token']: accessToken };

interface Props {
  onClose: (value: boolean) => void;
  open: boolean;
}

export const RemoveProfileModal: React.FC<Props> = ({ onClose, open }) => {
  const history = useHistory();

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
