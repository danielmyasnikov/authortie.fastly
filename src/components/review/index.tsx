import React, { useState } from 'react';
import Rating from '@material-ui/lab/Rating';
import { useParams } from 'react-router-dom';
import { Checkbox } from 'components/common/checkbox';
import { Button } from 'components/common/button';
import axios from 'axios';

import css from './styles.module.less';

const client = localStorage.getItem('client');
const accessToken = localStorage.getItem('access-token');
const uid = localStorage.getItem('uid');

const headers = { client, uid, ['access-token']: accessToken };

interface Params {
  id: string;
}

export const Review = () => {
  const [rate, setRate] = React.useState<number | null>(0);
  const [message, setMessage] = useState<string>('');
  const [visible, setVisible] = useState<boolean>(true);
  const [error, setError] = useState('');
  const [isConf, setIsConf] = useState(false);
  const params = useParams<Params>();

  async function submitReview() {
    const data = {
      rate,
      message,
      visible,
      reviewable_type: 'Posting',
      reviewable_id: params.id,
    };
    try {
      await axios({
        method: 'POST',
        headers,
        data,
        url: `https://authortie-app.herokuapp.com/api/v1/reviews`,
      });
      setIsConf(true);
    } catch {
      setError('Ошибка. Попробуйте позже.');
    }
  }

  return (
    <div className={css.wrapper}>
      <div className={css.content}>
        <h1 className={css.title}>Отзыв</h1>
        <textarea
          placeholder={'Введите отзыв'}
          className={css.textarea}
          onChange={(e) => setMessage(e.target.value)}
          value={message}
        />
        <div className={css.rating}>
          <Rating
            name="simple-controlled"
            value={rate}
            onChange={(event, newValue) => {
              setRate(newValue);
            }}
          />
        </div>

        <Checkbox
          checked={visible}
          id={String('id')}
          name={String('id')}
          label={'Показывать для всех'}
          onChange={() => setVisible(!visible)}
        />

        {isConf ? (
          <span className={css.confirm}>Отзыв успешно отправлен</span>
        ) : (
          <Button onClick={submitReview} className={css.btn}>
            Отправить
          </Button>
        )}
        <span className={css.error}>{error}</span>
      </div>
    </div>
  );
};
