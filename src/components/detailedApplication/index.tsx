import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import Camera from 'assets/camera.svg';
import { Button } from 'components/common/button';
import { Application } from 'components/applicationForm';
import { getLastPostings } from 'store/request/actions';
import { getDetailedApplication, submitBids } from 'store/detailedApplication/actions';
import { getDetailedApplicationSelector } from 'store/detailedApplication/selectors';
import { AppDispatch } from 'store/types';
import { getIsAuth } from 'store/auth/selectors';
import { getCreatePost } from 'store/request/selectors';
import { Footer } from 'components/footer';
import { Card } from 'components/common/card';
import Select from 'react-select';

import { ApplicationCard } from './applicationCard';
import { Author } from './athor';
import { Reward } from './reward';

import styles from './styles.module.less';

interface Params {
  id: string;
}

export enum OfferType {
  THERE_ARE_PUBLICATION,
  NEW_PUBLICATION,
}

export const DetailedApplication = () => {
  const dispatch: AppDispatch = useDispatch();
  const params = useParams<Params>();

  const { post }: any = useSelector(getDetailedApplicationSelector);
  const { t } = useTranslation('card');
  const { lastPostings } = useSelector(getCreatePost);
  const profile = post.is_profile_visible && post.user.profile;
  const [offerCooperation, setOfferCooperation] = useState(false);
  const [offerType, setOfferType] = useState<OfferType>();
  const [work, setWork] = useState<any>();
  const [lastPostingsOptions, setLastPostingsOptions] = useState<any[]>([]);
  const isAuth = useSelector(getIsAuth);

  useEffect(() => {
    if (params.id) {
      dispatch(getDetailedApplication(params.id));
    }
  }, [params.id]);

  useEffect(() => {
    if (isAuth) dispatch(getLastPostings());
  }, [isAuth]);

  useEffect(() => {
    const newLastOptions = lastPostings.map((item: any) => ({
      value: String(item.id),
      label: item.title,
    }));
    setLastPostingsOptions(newLastOptions);
  }, [lastPostings]);

  if (Object.keys(post).length == 0) {
    return <></>;
  }

  function selectWork(option: { label: string; value: string }) {
    const selectPost = lastPostings.filter((item: any) => String(item.id) === option.value)[0];
    setWork(selectPost);
  }

  async function submitOffer() {
    const requestType = post.request_type;
    const requestId = requestType === 'demand' && work ? work.id : Number(params.id);
    const supplyId = requestType === 'demand' && work ? Number(params.id) : work.id;

    const resultConf = await dispatch(submitBids({ requestId, supplyId }));
    if (submitBids.fulfilled.match(resultConf)) {
      dispatch(getDetailedApplication(params.id));
    }
  }

  const knowledgeAreaList = post.knowledge_area_list || [];
  const keywordList = post.keyword_list || [];
  const offers = post.offers || [];
  const isGuest = post.whois === 'guest';

  const renderListOffer = () => (
    <div className={styles.selectWrapper}>
      {!lastPostingsOptions.length ? (
        <span className={styles.info}>{t('emptyList')}</span>
      ) : (
        <Select
          classNamePrefix="CustomSelectOffer"
          defaultValue={lastPostingsOptions[0] && lastPostingsOptions[0].value}
          options={lastPostingsOptions}
          placeholder="changeWork"
          onChange={selectWork}
        />
      )}

      {!!work && <Button onClick={() => submitOffer()}>{t('suggest')}</Button>}
    </div>
  );

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <div className={styles.appWrapper}>
          <ApplicationCard
            workTypeList={post.work_type_list}
            knowledgeAreaList={knowledgeAreaList}
            keywordList={keywordList}
            title={post.title}
            comment={post.comment}
            // rewardType={post.reward_type}
            // rewardCurrency={post.reward_currency}
            // rewardSum={post.reward_sum}
            // id={params.id}
            approxDate={post.approx_date}
          />
          <div className={styles.authorInfo}>
            {isGuest && (
              <Author
                friendlyUrl={profile.friendly_url}
                avatar={profile.avatar}
                firstName={profile.first_name}
                lastName={profile.last_name}
                middleName={profile.middle_name}
                country={profile.country}
                affiliation={profile.affiliation}
                degree={profile.degree}
                degreeCategory={profile.degree_category}
                reputationScore={profile.reputation_score}
                regoDate={profile.rego_date}
                countOffers={post.count_offers}
              />
            )}
            <Reward
              rewardTypeList={post.reward_type_list}
              rewardSum={post.reward_sum}
              rewardCurrency={post.reward_currency}
              offerType={offerType}
              setOfferType={setOfferType}
              // interaction={'no_interaction'}
              interaction={post.interaction}
            />
          </div>
          {/* {offerCooperation && isGuest && <Offer />} */}
        </div>
        {offerType === OfferType.NEW_PUBLICATION && (
          <Application isOffer requestId={params.id} requestType={post.request_type} />
        )}
        {offerType === OfferType.THERE_ARE_PUBLICATION && renderListOffer()}
        <div className={styles.cards}>
          {offers.map((item: any) => (
            <React.Fragment key={item.id + item.title}>
              <Card post={item} />
            </React.Fragment>
          ))}
        </div>
      </div>

      <div className={styles.foot}>
        <Footer />
      </div>
    </div>
  );
};
