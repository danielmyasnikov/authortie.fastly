import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import Right from 'assets/right.svg';
import DefaultAvatar from 'assets/avatar.jpg';
import Key from 'assets/key.svg';
import { Button } from 'components/common/button';
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

  const showWords = keyWords.length > 2 ? [keyWords[0], keyWords[1]] : keyWords;
  const showRewardType = !!rewardType && !!rewardType.length ? rewardType : [];
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
        {rewardType.map((item: any) => (
          <React.Fragment key={item}>
            <div className={styles.rewardTag}>{item}</div>
            {item === 'money' && (
              <div className={styles.sum}>{`${rewardSum} ${rewardCurrency}`}</div>
            )}
          </React.Fragment>
        ))}
      </div>

      <div className={styles.keyWrapper}>
        {showWords.map((word: any) => (
          <React.Fragment key={word}>
            <Tag className={styles.tagKey}>
              <Key />
              {word}
            </Tag>
          </React.Fragment>
        ))}
        {numberAfterShowWords > 0 && (
          <Tag className={styles.tagKey}>{`+ ${numberAfterShowWords}`}</Tag>
        )}
      </div>

      <div className={styles.personBlock}>
        <Link to={`/profile/${friendlyUrl}`} className={styles.avatarWrapper}>
          <img className={styles.avatar} src={avatarUrl ? avatarUrl : DefaultAvatar} alt="" />
        </Link>
        {privateAccaunt ? (
          <span className={styles.text}>{t('hiddenProfile')}</span>
        ) : (
          <>
            {!privateAccaunt && !firstName && (
              <span className={styles.text}>{t('profileIsNotCompleted')}</span>
            )}

            {firstName && (
              <div className={styles.personInfo}>
                <div className={styles.row}>
                  <span className={styles.text}>{`${firstName} ${lastName} ${middleName}`}</span>
                </div>
                <div className={styles.row}>
                  <span className={styles.comment}>{`${degree} ${degreeCategory}`}</span>
                </div>

                <span className={styles.comment}>{affiliation}</span>
              </div>
            )}
          </>
        )}
      </div>

      <div className={styles.btnWrapper}>
        {isMyPost ? (
          <Link to={`/edit/${id}`}>
            <Button className={styles.btn}>{t('edit')}</Button>
          </Link>
        ) : (
          <Link to={`/community/${id}?offerCooperation=true`}>
            <Button className={styles.btn}>{t('offerCooperation')}</Button>
          </Link>
        )}

        <Link to={`/community/${id}`} className={styles.rightBtn}>
          <Right className={styles.rigthIcon} />
        </Link>
      </div>
    </div>
  );
};
