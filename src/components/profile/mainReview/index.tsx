import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Rating from '@material-ui/lab/Rating';

import axios from 'axios';

import css from './styles.module.less';

const client = localStorage.getItem('client');
const accessToken = localStorage.getItem('access-token');
const uid = localStorage.getItem('uid');

const headers = { client, uid, ['access-token']: accessToken };

export const MainReview = () => {
  const dispatch = useDispatch();
  const [reviewList, setRewiewList] = useState([]);

  useEffect(() => {
    getReview();
  }, []);

  async function getReview() {
    const res = await axios({
      headers,
      url: `https://authortie-app.herokuapp.com/api/v1/reviews/mine`,
    });
    setRewiewList(res.data);
  }

  return (
    <div className={css.wrapper}>
      <div className={css.cards}>
        {!!reviewList.length &&
          reviewList.map((item: any) => (
            <div className={css.wrap}>
              <span className={css.title}>Название работы:</span>
              <span className={css.text}>{item.reviewable.title}</span>
              <span className={css.title}>Отзыв:</span>
              <span className={css.text}>{item.message}</span>
              <Rating name="read-only" value={item.rate} readOnly />
            </div>
          ))}
      </div>
    </div>
  );
};
