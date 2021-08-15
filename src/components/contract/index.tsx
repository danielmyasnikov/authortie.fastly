import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import Camera from 'assets/camera.svg';
import { getDetailedApplication } from 'store/detailedApplication/actions';
import { getDetailedApplicationSelector } from 'store/detailedApplication/selectors';
import { submitBidsUp } from 'store/detailedApplication/actions';
import { AppDispatch } from 'store/types';
import { getIsAuth } from 'store/auth/selectors';
import { Footer } from 'components/footer';
import { Button } from 'components/common/button';
import axios from 'axios';
import { Tag } from './tag';
import { data } from './mock';

import styles from './styles.module.less';

interface Params {
  id: string;
}

// открыть при использовании бэка
// const client = localStorage.getItem('client');
// const accessToken = localStorage.getItem('access-token');
// const uid = localStorage.getItem('uid');

// const headers = { client, uid, ['access-token']: accessToken };

export const Contract = () => {
  const params = useParams<Params>();
  const { t } = useTranslation('card');
  const [post, setPost] = useState<any>(null);

  useEffect(() => {
    getContract();
  }, []);

  async function getContract() {
    // ***********
    // const res = await axios({
    //   headers,
    //   url: `https://authortie-app.herokuapp.com/api/v1/ вставить сюда ручку, при необходимости тащим params.id - id заявки`,
    // });
    // setPost(res.data);
    // ***********
    setPost(data);
  }

  const renderCardwrap = (application: any, isOffer: boolean) => {
    const knowledgeAreaList = application.knowledge_area_list || [];
    const keywordList = application.keyword_list || [];
    const profile = application.is_profile_visible && application.user.profile;
    return (
      <div className={styles.cardWrap}>
        <div className={styles.tagWrapper}>
          <Tag className={styles.workType}>{t(application.work_type_list[0])}</Tag>

          {knowledgeAreaList.length > 0 &&
            knowledgeAreaList.map((item: any) => (
              <React.Fragment key={item}>
                <Tag className={styles.knowledgeArea}>{item}</Tag>
              </React.Fragment>
            ))}
        </div>
        <span className={styles.subtitle}>{application.title}</span>
        <span className={styles.text}>{t('keyWords')}</span>
        <div className={styles.tagWrapper}>
          {keywordList.length > 0 &&
            keywordList.map((item: any) => (
              <React.Fragment key={item}>
                <Tag>{item}</Tag>
              </React.Fragment>
            ))}
        </div>
        <span className={styles.text}>{t('comment')}</span>
        <span className={styles.comment}>{application.comment}</span>
        <span className={styles.text}>{t('reward')}</span>
        <div className={styles.tagWrapper}>
          {application.reward_type === 'money' && (
            <span
              className={styles.comment}
            >{`${application.reward_sum} ${application.reward_currency}`}</span>
          )}
          {application.reward_type !== 'money' && (
            <span className={styles.comment}>{t(application.reward_type)}</span>
          )}
        </div>

        {!isOffer && (
          <Link to={`/edit/${params.id}`}>
            <Button>{t('edit')}</Button>
          </Link>
        )}

        {isOffer && (
          <>
            {application.is_profile_visible ? (
              !!profile.first_name ? (
                <div className={styles.profileWrapper}>
                  <Link to={`/profile/${profile.slug}`} className={styles.avatarWrapper}>
                    {!!profile.avatar ? (
                      <img className={styles.img} src={profile.avatar} alt="" />
                    ) : (
                      <Camera className={styles.defaultPhoto} />
                    )}
                  </Link>
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
                  </div>
                </div>
              ) : (
                <span className={styles.text}>{t('profileIsNotCompleted')}</span>
              )
            ) : (
              <span className={styles.text}>{t('hiddenProfile')}</span>
            )}
          </>
        )}
      </div>
    );
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        {post && renderCardwrap(post, false)}
        {post && renderCardwrap(post.offer, true)}
      </div>

      <div className={styles.foot}>
        <Footer />
      </div>
    </div>
  );
};
