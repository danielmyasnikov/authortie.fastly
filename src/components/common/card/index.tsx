import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import ReactTooltip from 'react-tooltip';
import Camera from 'assets/camera.svg';
import Right from 'assets/right.svg';
import Key from 'assets/key.svg';
import { Tag } from './tag';
import { Button } from 'components/common/button';
import styles from './styles.module.less';

interface Props {
  privateAccaunt: boolean;
  keyWords: string[];
  comment: string;
  author: any;
  title: string;
  workType: string;
  fieldOfActivity: string;
  id: number;
  key?: number | string;
  knowledgeArea: string[];
  rewardType: string[];
  rewardCurrency: string;
  rewardSum: string;
  rewardСomment: string;
  whois: string;
  avatarUrl?: string;
}

export const Card: React.FC<Props> = ({
  privateAccaunt,
  keyWords,
  comment,
  author,
  title,
  workType,
  fieldOfActivity,
  id,
  key,
  knowledgeArea,
  rewardCurrency,
  rewardType,
  rewardSum,
  rewardСomment,
  whois,
  avatarUrl,
}) => {
  const { t } = useTranslation('card');
  const showWords = !!keyWords && !!keyWords.length ? keyWords : [];
  const showRewardType = !!rewardType && !!rewardType.length ? rewardType : [];
  const numberAfterShowWords = !!keyWords && !!keyWords.length && keyWords.length - 3;
  const numberAfterShowRewardType = !!rewardType && !!rewardType.length && rewardType.length - 3;
  const numberAfterShowWordsKnowledgeArea = knowledgeArea.length - 1;
  const isMyPost = whois !== 'guest';

  return (
    <div className={styles.wrapper} key={key}>
      {t(workType).length > 25 && (
        <ReactTooltip
          id={`${workType} + ${id}`}
          className={styles.tooltip}
          place="top"
          effect="solid"
        />
      )}
      {t(knowledgeArea[0]).length > 25 && (
        <ReactTooltip
          id={`${knowledgeArea} + ${id}`}
          className={styles.tooltip}
          place="top"
          effect="solid"
        />
      )}

      <div className={styles.tagWrapper}>
        <Tag className={styles.workType} dataTip={t(workType)} dataFor={`${workType} + ${id}`}>
          {t(workType)}
        </Tag>

        <Tag
          className={styles.knowledgeArea}
          dataTip={t(knowledgeArea[0])}
          dataFor={`${fieldOfActivity} + ${id}`}
        >
          {t(knowledgeArea[0])}
        </Tag>
        {!!numberAfterShowWordsKnowledgeArea && (
          <Tag className={styles.knowledgeArea}>{`+ ${numberAfterShowWordsKnowledgeArea}`}</Tag>
        )}
      </div>

      <span className={styles.subTitle}>{title}</span>

      <span className={styles.text}>{t('comment')}</span>
      <span className={styles.comment}>{comment}</span>

      <span className={styles.text}>{t('reward')}</span>
      <div className={styles.tagWrapper}>
        {rewardType &&
          rewardType.map((item) => (
            <React.Fragment key={item}>
              {item === 'money' && (
                <div className={styles.award}>
                  <Button className={styles.btn}>
                    Оплата деньгами
                  </Button>
                  <span className={styles.price}>{`${rewardSum} ${rewardCurrency}`}</span>
                </div>
              )}
              {item !== 'money' &&
                <Button className={styles.btnRewardType}>{t(rewardType)}</Button>
              }
              {numberAfterShowWords > 0 && <Tag>{`+ ${numberAfterShowWords}`}</Tag>}
            </React.Fragment>
          ))
        }
      </div>

      <div className={styles.keyWrapper}>
        {showWords.map((word) => (
          <React.Fragment key={word}>
            <Tag className={styles.tagKey}>
              <Key />
              {word}
            </Tag>
          </React.Fragment>
        ))}
        {numberAfterShowWords > 0 && <Tag>{`+ ${numberAfterShowWords}`}</Tag>}
      </div>
      <div className={styles.personBlock}>
        <img src={avatarUrl} alt="" />
        {privateAccaunt ? (
          <span className={styles.text}>{t('hiddenProfile')}</span>
        ) : (
          <>
            {!privateAccaunt && !author.first_name && (
              <span className={styles.text}>{t('profileIsNotCompleted')}</span>
            )}

            {author.first_name && (
              <div className={styles.personInfo}>

                <div className={styles.row}>
                  <span className={styles.text}>
                    {`${author.first_name} ${author.last_name} ${author.middle_name}`}
                  </span>
                </div>
                <div className={styles.row}>
                  <span className={styles.comment}>{`${t(author.degree)} ${author.degree_category
                    }`}</span>
                </div>

                <span className={styles.comment}>{author.affiliation}</span>
              </div>
            )}
          </>
        )}
      </div>

      <div className={styles.btnWrapper}>
        {isMyPost ?
          <Link to={`/edit/${id}`}>
            <Button className={styles.btn}>
              {t('edit')}
            </Button>
          </Link>
          :
          <Link to={`/community/${id}?offerCooperation=true`}>
            <Button className={styles.btn}>
              {t('offerCooperation')}
            </Button>
          </Link>
        }

        <Link to={`/community/${id}`}>
          <Button className={styles.rightBtn}>
            <Right className={styles.rigthIcon} />
          </Button>
        </Link>
      </div>
    </div>
  );
};
