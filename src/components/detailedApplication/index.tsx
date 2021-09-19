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
import { Card } from 'components/common/card';
import { Button } from 'components/common/button';
import { Tag } from './tag';
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
    if (!!params.id) {
      dispatch(getDetailedApplication(params.id));
    }
  }, [params.id]);

  if (Object.keys(post).length == 0) {
    return <></>;
  }
  const postingId = post.posting_id;
  async function submitOffer(requstType: string) {
    // @ts-ignore
    const requestId = postingId;
    const supplyId = Number(params.id);
    const agreementType = requstType;

    const resultConf = await dispatch(submitBidsUp({ requestId, supplyId, agreementType }));
    if (submitBidsUp.fulfilled.match(resultConf)) {
      dispatch(getDetailedApplication(params.id));
    }
  }

  const knowledgeAreaList = post.knowledge_area_list || [];
  const keywordList = post.keyword_list || [];
  const offers = post.offers || [];
  const isGuest = post.whois === 'guest';

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <div className={styles.cardWrap}>
          <div className={styles.tagWrapper}>
            <Tag className={styles.workType}>{t(post.work_type_list[0])}</Tag>

            {knowledgeAreaList.length > 0 &&
              knowledgeAreaList.map((item: any) => (
                <React.Fragment key={item}>
                  <Tag className={styles.knowledgeArea}>{item}</Tag>
                </React.Fragment>
              ))}
          </div>
          <span className={styles.subtitle}>{post.title}</span>
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
          <span className={styles.comment}>{post.comment}</span>
          <span className={styles.text}>{t('reward')}</span>
          <div className={styles.tagWrapper}>
            {post.reward_type === 'money' && (
              <span className={styles.comment}>{`${post.reward_sum} ${post.reward_currency}`}</span>
            )}
            {post.reward_type !== 'money' && (
              <span className={styles.comment}>{t(post.reward_type)}</span>
            )}
          </div>
          {isGuest && (
            <Link className={styles.toReview} to={`/review/${params.id}`}>
              {t('addReview')}
            </Link>
          )}
          {!postingId && isGuest && (
            <Button onClick={() => setOfferCooperation(true)}>{t('offerCooperation')}</Button>
          )}
          {!!postingId && isGuest && <Button>{t('toDialog')}</Button>}
          {!isGuest && (
            <Link to={`/edit/${params.id}`}>
              <Button>{t('edit')}</Button>
            </Link>
          )}
        </div>

        {isGuest && (
          <div className={styles.profileWrapper}>
            {post.is_profile_visible ? (
              !!profile.first_name ? (
                <>
                  <Link to={`/profile/${profile.friendly_url}`} className={styles.avatarWrapper}>
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
              workType={!!item.length ? item?.work_type_list[0] : ''}
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
