import React, { useState } from 'react';
import Rating from '@material-ui/lab/Rating';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Checkbox } from 'components/common/checkbox';
import { Button } from 'components/common/button';
import axios from 'axios';
import { getHeaders } from 'store/auth/selectors';

import css from './styles.module.less';

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
  const { t } = useTranslation('review');
  const headers = useSelector(getHeaders);

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
      setError(t('error'));
    }
  }

  return (
    <div className={css.wrapper}>
      <div className={css.content}>
        <h1 className={css.title}>{t('title')}</h1>
        <textarea
          placeholder={t('addReview')}
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
          label={t('showFowAll')}
          onChange={() => setVisible(!visible)}
        />

        {isConf ? (
          <span className={css.confirm}>{t('confirm')}</span>
        ) : (
          <Button onClick={submitReview} className={css.btn}>
            {t('submit')}
          </Button>
        )}
        <span className={css.error}>{error}</span>
      </div>
    </div>
  );
};
