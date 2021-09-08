import { useEffect, useState } from 'react';
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

export const MainReview = () => {
  const dispatch = useDispatch();
  const [reviewList, setRewiewList] = useState([]);
  const { t } = useTranslation('profile');

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
      {console.log(reviewList)}
      <div className={css.cards}>
        {!!reviewList.length &&
          reviewList.map((item: any) => (
            <div className={css.wrap}>
              <div className={css.header}>
                <div className={css.title}>Title</div>
                <Rating name="read-only" value={item.rate} readOnly />
              </div>
              <div className={css.content}>
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
                  <p className={css.message}>{item.message}</p>
                </div>
                <div className={css.date}>
                  8 января 2021
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};
