import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import Camera from 'assets/camera.svg';
import { getDetailedApplication, submitBidsUp } from 'store/detailedApplication/actions';
import { getDetailedApplicationSelector } from 'store/detailedApplication/selectors';
import { AppDispatch } from 'store/types';
import { getIsAuth } from 'store/auth/selectors';
import { Footer } from 'components/footer';
import { Card } from 'components/common/card';

import { ApplicationCard } from './applicationCard';

import { Offer } from './offer';

import styles from './styles.module.less';

interface Params {
  id: string;
}

export const DetailedApplication = () => {
  const dispatch: AppDispatch = useDispatch();
  const params = useParams<Params>();

  const { post }: any = useSelector(getDetailedApplicationSelector);
  const { t } = useTranslation('card');
  const profile = post.is_profile_visible && post.user.profile;
  const [offerCooperation, setOfferCooperation] = useState(false);
  const isAuth = useSelector(getIsAuth);

  useEffect(() => {
    if (params.id) {
      dispatch(getDetailedApplication(params.id));
    }
  }, [params.id]);

  if (Object.keys(post).length == 0) {
    return <></>;
  }
  const postingId = post.posting_id;
  // async function submitOffer(requstType: string) {
  //   // @ts-ignore
  //   const requestId = postingId;
  //   const supplyId = Number(params.id);
  //   const agreementType = requstType;

  //   const resultConf = await dispatch(submitBidsUp({ requestId, supplyId, agreementType }));
  //   if (submitBidsUp.fulfilled.match(resultConf)) {
  //     dispatch(getDetailedApplication(params.id));
  //   }
  // }

  const knowledgeAreaList = post.knowledge_area_list || [];
  const keywordList = post.keyword_list || [];
  const offers = post.offers || [];
  const isGuest = post.whois === 'guest';

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <ApplicationCard 
        workTypeList = {post.work_type_list}
        knowledgeAreaList={knowledgeAreaList}
        keywordList={keywordList}
        title={post.title}
        comment={post.comment}
        rewardType ={post.reward_type}
        rewardCurrency={post.reward_currency}
        rewardSum={post.reward_sum}
        id={params.id}
        approxDate={post.approx_date}
        />
        {isGuest && (
          <div className={styles.profileWrapper}>
            {post.is_profile_visible ? (
              profile.first_name ? (
                <>
                  <Link to={`/profile/${profile.friendly_url}`} className={styles.avatarWrapper}>
                    {profile.avatar ? (
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
                      <span className={styles.comment}>
                        {`${t(profile.degree)} ${profile.degree_category}`}
                      </span>
                    </div>

                    <span className={styles.comment}>{profile.affiliation}</span>
                    <span className={styles.comment}>{profile.about}</span>
                  </div>
                </>
              ) : (
                <span className={styles.text}>{t('profileIsNotCompleted')}</span>
              )
            ) : (
              <span className={styles.text}>{t('hiddenProfile')}</span>
            )}
          </div>
        )}
        {offerCooperation && isGuest && <Offer />}

        <div className={styles.cards}>
          {offers.map((item: any) => (
            <Card
              key={item.id}
              privateAccaunt={!item.is_profile_visible}
              id={item.id}
              keyWords={item.keyword_list}
              comment={item.comment}
              author={!!item.user && item.user.profile}
              title={item.title}
              fieldOfActivity=""
              workType={item.length ? item?.work_type_list[0] : ''}
              knowledgeArea={item.knowledge_area_list || ''}
              rewardType={item.reward_type}
              rewardCurrency={item.reward_currency}
              rewardSum={item.reward_sum}
              rewardСomment={item.reward_comment}
              whois={item.whois}
            />
          ))}
        </div>
      </div>

      <div className={styles.foot}>
        <Footer />
      </div>
    </div>
  );
};
