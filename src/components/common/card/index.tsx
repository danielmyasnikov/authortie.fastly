import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import Right from 'assets/right.svg';
import DefaultAvatar from 'assets/avatar.jpg';
import Key from 'assets/key.svg';
import Eye from 'assets/eye2.svg';
import { Tag } from './tag';
import styles from './styles.module.less';

interface Props {
  post: any;
}
export const Card: React.FC<Props> = ({ post }) => {
  const { t } = useTranslation('card');
  if (!post) return null;
  const {
    id,
    work_type_list: workType,
    knowledge_area_list: knowledgeArea,
    title,
    comment,
    reward_type_list: rewardType,
    reward_sum: rewardSum,
    reward_currency: rewardCurrency,
    keyword_list: keyWords,
    whois,
    user,
    is_profile_visible: privateAccaunt,
    count_offers: countOffers,
    count_views: countViews,
  } = post;

  if (!user) return null;

  const {
    first_name: firstName,
    middle_name: middleName,
    last_name: lastName,
    affiliation,
    degree,
    avatar_url: avatarUrl,
    profile_friendly_id: friendlyUrl,
    degree_category: degreeCategory,
  } = user.profile;

  const showKeyWords = keyWords.length > 2 ? [keyWords[0], keyWords[1]] : keyWords;
  const numberKeyWords = keyWords.length > 2 ? keyWords.length - 2 : 0;
  const showRewardType = rewardType.length > 2 ? [rewardType[0], rewardType[1]] : rewardType;
  const numberRewardType = rewardType.length > 2 ? rewardType.length - 2 : 0;

  const numberAfterShowWords = !!keyWords && !!keyWords.length && keyWords.length - 3;
  const numberAfterShowRewardType = !!rewardType && !!rewardType.length && rewardType.length - 3;
  const numberAfterShowWordsKnowledgeArea = knowledgeArea.length - 1;
  const isMyPost = whois !== 'guest';

  return (
    <div className={styles.wrapper}>
      <div className={styles.tagWrapper}>
        <Tag className={styles.workType}>{workType}</Tag>

        <Tag className={styles.knowledgeArea}>{knowledgeArea[0]}</Tag>
        {!!numberAfterShowWordsKnowledgeArea && (
          <Tag className={styles.knowledgeArea}>{`+ ${numberAfterShowWordsKnowledgeArea}`}</Tag>
        )}
      </div>
      <span className={styles.subTitle}>{title}</span>

      <span className={styles.text}>{t('comment')}</span>
      <span className={styles.comment}>{comment}</span>

      <span className={styles.text}>{t('reward')}</span>

      <div className={styles.tagWrapper}>
        {showRewardType.map((item: any) => (
          <React.Fragment key={item}>
            <div className={styles.rewardTag}>{item}</div>
            {item === 'money' && (
              <div className={styles.sum}>{`${rewardSum} ${rewardCurrency}`}</div>
            )}
          </React.Fragment>
        ))}
        {numberRewardType > 0 && <Tag className={styles.rewardTag}>{`+ ${numberRewardType}`}</Tag>}
      </div>

      <div className={styles.keyWrapper}>
        {showKeyWords.map((word: any) => (
          <React.Fragment key={word}>
            <Tag className={styles.tagKey}>
              <Key />
              {word}
            </Tag>
          </React.Fragment>
        ))}
        {numberKeyWords > 0 && <Tag className={styles.tagKey}>{`+ ${numberKeyWords}`}</Tag>}
      </div>

      <div className={styles.personBlock}>
        <Link to={`/profile/${friendlyUrl}`} className={styles.avatarWrapper}>
          <img className={styles.avatar} src={avatarUrl ? avatarUrl : DefaultAvatar} alt="" />
        </Link>
        {privateAccaunt && <span className={styles.info}>{t('hiddenProfile')}</span>}

        {!privateAccaunt && !firstName && (
          <span className={styles.info}>{t('profileIsNotCompleted')}</span>
        )}

        {!privateAccaunt && firstName && (
          <div className={styles.subTitle}>
            <div className={styles.row}>
              <span className={styles.info}>{`${firstName} ${lastName} ${middleName}`}</span>
            </div>
            <div className={styles.row}>
              <span className={styles.comment}>{`${degree} ${degreeCategory}`}</span>
            </div>

            <span className={styles.comment}>{affiliation}</span>
          </div>
        )}
      </div>

      <div className={styles.btnWrapper}>
        <div className={styles.footerInfo}>
          <span className={styles.offers}>{`Количество предложений: ${countOffers}`}</span>
          <span className={styles.countViews}>
            <Eye />
            {`количество просмотров: ${countViews}`}
          </span>
        </div>
        <Link to={`/community/${id}`} className={styles.rightBtn}>
          <Right className={styles.rigthIcon} />
        </Link>
      </div>
    </div>
  );
};
