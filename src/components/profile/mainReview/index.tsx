import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Rating from '@material-ui/lab/Rating';
import { useTranslation } from 'react-i18next';
import CheckedProfile from 'assets/checkedProfile.svg';
import ProfilePic from 'assets/profilePic.svg';

import axios from 'axios';

import css from './styles.module.less';

const client = localStorage.getItem('client');
const accessToken = localStorage.getItem('access-token');
const uid = localStorage.getItem('uid');

const headers = { client, uid, ['access-token']: accessToken };

interface Props {
  id?: string;
}

export const MainReview: React.FC<Props> = ({ id }) => {
  const dispatch = useDispatch();
  const [reviewList, setRewiewList] = useState([]);
  const { t } = useTranslation('profile');

  useEffect(() => {
    getReview();
  }, []);

  async function getReview() {
    const url = !!id
      ? `https://authortie-app.herokuapp.com/api/v1/profiles/${id}/reputation`
      : `https://authortie-app.herokuapp.com/api/v1/reviews/mine`;
    const res = await axios({
      headers,
      url,
    });
    setRewiewList(res.data);
  }

  return (
    <div className={css.wrapper}>
      <div className={css.cards}>
        {!!reviewList.length ? (
          reviewList.map((item: any) => (
            <div className={css.wrap}>
              <div className={css.header}>
                <div className={css.title}>Title</div>
              </div>
              <div className={css.rating}>
                <Rating name="read-only" value={item.rate} readOnly />
              </div>
              <div className={css.profile}>
                <div className={css.profilePic}>
                  <ProfilePic />
                </div>
                <div className={css.checkedProfile}>
                  <CheckedProfile />
                </div>
              </div>
              <div className={css.comment}>
                <span className={css.title}>Сергей Сергеев</span>
              </div>
              <div className={css.messageBlock}>
                <p className={css.message}>{item.message}</p>
              </div>
              <div className={css.date}>8 января 2021</div>
            </div>
          ))
        ) : (
          <span>Пока нет отзывов</span>
        )}
      </div>
    </div>
  );
};
