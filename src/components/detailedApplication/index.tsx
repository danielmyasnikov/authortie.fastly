import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import Camera from 'assets/camera.svg';
import { getDetailedApplication } from 'store/detailedApplication/actions';
import { getDetailedApplicationSelector } from 'store/detailedApplication/selectors';
import { Footer } from 'components/footer';
import { Button } from 'components/common/button';
import { Tag } from './tag';

import styles from './styles.module.less';

interface Params {
  id: string;
}

export const DetailedApplication = () => {
  const dispatch = useDispatch();
  const params = useParams<Params>();
  const { post }: any = useSelector(getDetailedApplicationSelector);

  const { t } = useTranslation('card');
  useEffect(() => {
    if (!!params.id) dispatch(getDetailedApplication(params.id));
  }, []);

  if (Object.keys(post).length == 0) {
    return null;
  }
  const { profile } = post.user;
  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <div className={styles.cardWrap}>
          <div className={styles.tagWrapper}>
            <Tag className={styles.workType}>{t(post.work_type)}</Tag>

            {post.knowledge_area_list.length > 0 &&
              post.knowledge_area_list.map((item: any) => (
                <React.Fragment key={item}>
                  <Tag className={styles.knowledgeArea}>{item}</Tag>
                </React.Fragment>
              ))}
          </div>
          <span className={styles.subtitle}>{post.title}</span>
          <span className={styles.text}>Ключевые слова:</span>
          <div className={styles.tagWrapper}>
            {post.keyword_list.length > 0 &&
              post.keyword_list.map((item: any) => (
                <React.Fragment key={item}>
                  <Tag>{item}</Tag>
                </React.Fragment>
              ))}
          </div>
          <span className={styles.text}>Комментарий</span>
          <span className={styles.comment}>{post.comment}</span>
          <span className={styles.text}>Вознаграждение</span>
          <div className={styles.tagWrapper}>
            {post.reward_type === 'money' && (
              <span className={styles.comment}>{`${post.reward_sum} ${post.reward_currency}`}</span>
            )}
            {post.reward_type !== 'money' && (
              <span className={styles.comment}>{t(post.reward_type)}</span>
            )}
          </div>
          <Button>Предложить сотрудничество</Button>
        </div>

        <div className={styles.profileWrapper}>
          <div className={styles.avatarWrapper}>
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
          </div>
        </div>
      </div>

      <div className={styles.foot}>
        <Footer />
      </div>
    </div>
  );
};
