import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import eoLocale from 'date-fns/locale/eo';
import format from 'date-fns/format';
import Rating from '@material-ui/lab/Rating';
import { useTranslation } from 'react-i18next';
import CheckedProfile from 'assets/checkedProfile.svg';
import ProfilePic from 'assets/profilePic.svg';
import { getHeaders } from 'store/auth/selectors';

import axios from 'axios';

import css from './styles.module.less';

interface Props {
  id?: string;
}

export const MainReview: React.FC<Props> = ({ id }) => {
  const dispatch = useDispatch();
  const [reviewList, setRewiewList] = useState([]);
  const { t, i18n } = useTranslation('profile');
  const headers = useSelector(getHeaders);
  console.log(i18n);
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

  function getName(review: any) {
    return review.profile.name
      ? `review.profile.name review.profile.last_name review.profile.middle_name`
      : 'Нет имени';
  }

  function getTime(value: any) {
    const lang = i18n.language === 'ru' ? 'ru' : 'en';
    const date = new Date(value);
    const formatter = new Intl.DateTimeFormat(lang, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    return formatter.format(date);
  }

  return (
    <div className={css.wrapper}>
      <div className={css.cards}>
        {!!reviewList.length ? (
          reviewList.map((item: any) => (
            <div className={css.wrap}>
              <div className={css.header}>
                <div className={css.title}>{item.reviewable.title || 'Нет назавания работы'}</div>
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
                <span className={css.title}>{getName(item)}</span>
              </div>
              <div className={css.messageBlock}>
                <p className={css.message}>{item.message}</p>
              </div>
              <div className={css.date}>{getTime(item.created_at)}</div>
            </div>
          ))
        ) : (
          <span>Пока нет отзывов</span>
        )}
      </div>
    </div>
  );
};
