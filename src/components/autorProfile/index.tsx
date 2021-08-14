import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAuthProfile } from 'store/profile/actions';
import { useTranslation } from 'react-i18next';
import { useHistory, useParams, Link } from 'react-router-dom';
import { Footer } from 'components/footer';
import { getProfileSelector } from 'store/profile/selectors';
import Camera from 'assets/camera.svg';
import cn from 'classnames';
import Rating from '@material-ui/lab/Rating';

import axios from 'axios';

import styles from './styles.module.less';

const client = localStorage.getItem('client');
const accessToken = localStorage.getItem('access-token');
const uid = localStorage.getItem('uid');

const headers = { client, uid, ['access-token']: accessToken };

interface Params {
  id: string;
}

enum Item {
  MAIN = 'main',
  PROFILE = 'profile',
  REVIEW = 'review',
}

export const AuthorProfile = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation('card');
  const { profile } = useSelector(getProfileSelector);
  const params = useParams<Params>();
  const [reviewList, setRewiewList] = useState([]);
  const [itemNavbar, setItemNavbar] = useState(Item.PROFILE);
  const [author, setAuthor] = useState();

  useEffect(() => {
    dispatch(getAuthProfile(params.id));
  }, []);

  useEffect(() => {
    if (!Number.isNaN(profile.id)) {
      getReview();
    }
  }, [profile]);

  async function getReview() {
    const res = await axios({
      headers,
      url: `https://authortie-app.herokuapp.com/api/v1/profiles/${profile.id}/reputation`,
    });
    setRewiewList(res.data);
  }

  const renderProfile = () => (
    <div className={styles.profileWrapper}>
      <div className={styles.avatarWrapper}>
        {!!profile.avatar ? (
          <img className={styles.img} src={profile.avatarUrl} alt="" />
        ) : (
          <Camera className={styles.defaultPhoto} />
        )}
      </div>
      <div className={styles.personInfo}>
        <div className={styles.row}>
          <span className={styles.text}>
            {`${profile.name} ${profile.lastName} ${profile.middleName}`}
          </span>
          {/* <span className={styles.country}>{profile.country}</span> */}
        </div>
        {/* <div className={styles.row}>
          <span className={styles.comment}>{`${t(profile.)} ${
            profile.degree_category
          }`}</span>
        </div> */}

        <span className={styles.comment}>{profile.affiliation}</span>
        <span className={styles.comment}>{profile.about}</span>
      </div>
    </div>
  );
  const renderReview = () => (
    <div className={styles.wrapperReview}>
      <div className={styles.cardsReview}>
        {!!reviewList.length &&
          reviewList.map((item: any) => (
            <div className={styles.wrapReview}>
              <span className={styles.titleReview}>Название работы:</span>
              <span className={styles.textReview}>{item.reviewable.title}</span>
              <span className={styles.titleReview}>Отзыв:</span>
              <span className={styles.textReview}>{item.message}</span>
              <Rating name="read-only" value={item.rate} readOnly />
            </div>
          ))}
      </div>
    </div>
  );

  const renderProfileItems = () => {
    switch (itemNavbar) {
      case Item.PROFILE:
        return renderProfile();
      case Item.MAIN:
        return renderReview();
      case Item.REVIEW:
        return renderReview();
      default:
        break;
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <div className={styles.navBarWrapper}>
          <span
            className={cn(styles.navBarItem, { [styles.active]: itemNavbar === Item.PROFILE })}
            onClick={() => setItemNavbar(Item.PROFILE)}
          >
            Личная информация
          </span>
          {/* <span
            className={cn(styles.navBarItem, { [styles.active]: itemNavbar === Item.MAIN })}
            onClick={() => setItemNavbar(Item.MAIN)}
          >
            Мои заявки
          </span> */}
          <span
            className={cn(styles.navBarItem, { [styles.active]: itemNavbar === Item.REVIEW })}
            onClick={() => setItemNavbar(Item.REVIEW)}
          >
            Отзывы
          </span>
        </div>
        {renderProfileItems()}
      </div>

      <div className={styles.footer}>
        <Footer />
      </div>
    </div>
  );
};
