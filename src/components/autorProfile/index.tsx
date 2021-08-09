import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAuthProfile } from 'store/profile/actions';
import { useHistory, useParams, Link } from 'react-router-dom';
import { getProfileSelector } from 'store/profile/selectors';
import Camera from 'assets/camera.svg';
import styles from './styles.module.less';

export const AuthorProfile = () => {
  const dispatch = useDispatch();
  const { profile } = useSelector(getProfileSelector);
  // const params = useParams<Params>();
  console.log(profile);
  useEffect(() => {
    // dispatch(getAuthProfile(params.id));
  }, []);
  return (
    <div className={styles.profileWrapper}>
      {/* <div className={styles.avatarWrapper}>
        {!!profile.avatar ? (
          <img className={styles.img} src={profile.avatar} alt="" />
        ) : (
          <Camera className={styles.defaultPhoto} />
        )}
      </div>
      <div className={styles.personInfo}>
        <div className={styles.row}>
          <span className={styles.text}>
            {`${profile.first_name} ${profile.last_name} ${profile.middle_name}`}
          </span>
          <span className={styles.country}>{profile.country}</span>
        </div>
        <div className={styles.row}>
          <span className={styles.comment}>{`${t(profile.degree)} ${
            profile.degree_category
          }`}</span>
        </div>

        <span className={styles.comment}>{profile.affiliation}</span>
        <span className={styles.comment}>{profile.about}</span>
      </div> */}
    </div>
  );
};
