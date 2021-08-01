import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import ReactTooltip from 'react-tooltip';
import Camera from 'assets/camera.svg';
import Right from 'assets/right.svg';
import { Tag } from './tag';
import { Button } from 'components/common/button';
import styles from './styles.module.less';

interface Props {
  privateAccaunt: boolean;
  keyWords: string[];
  comment: string;
  authorStatus: string;
  institution: string;
  author: any;
  title: string;
  workType: string;
  fieldOfActivity: string;
  id: number;
  key?: number | string;
  knowledgeArea: string[];
  rewardType: string;
  rewardCurrency: string;
  rewardSum: string;
  rewardСomment: string;
}

export const Card: React.FC<Props> = ({
  privateAccaunt,
  keyWords,
  comment,
  author,
  institution,
  authorStatus,
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
}) => {
  const { t } = useTranslation('card');
  const showWords = !!keyWords.length ? keyWords : [];
  const numberAfterShowWords = keyWords.length - 3;
  const numberAfterShowWordsKnowledgeArea = knowledgeArea.length - 1;

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
        {rewardType === 'money' && (
          <span className={styles.comment}>{`${rewardSum} ${rewardCurrency}`}</span>
        )}
        {rewardType !== 'money' && <span className={styles.comment}>{t(rewardType)}</span>}
      </div>

      <div className={styles.keyWrapper}>
        {showWords.map((word) => (
          <Tag key={word}>{word}</Tag>
        ))}
        {numberAfterShowWords > 0 && <Tag>{`+ ${numberAfterShowWords}`}</Tag>}
      </div>
      <div className={styles.personBlock}>
        {!author.first_name && !author.public_visibility && (
          <span className={styles.text}>Профиль не заполнен</span>
        )}
        {!author.public_visibility && author.first_name && (
          <span className={styles.text}>Профиль скрыт</span>
        )}
        {author.first_name && author.public_visibility && (
          <div className={styles.personInfo}>
            <div className={styles.row}>
              <span className={styles.text}>
                {`${author.first_name} ${author.last_name} ${author.middle_name}`}
              </span>
              <span className={styles.country}>{author.country}</span>
            </div>
            <div className={styles.row}>
              <span className={styles.comment}>{`${t(author.degree)} ${
                author.degree_category
              }`}</span>
            </div>

            <span className={styles.comment}>{author.affiliation}</span>
          </div>
        )}
      </div>

      <div className={styles.btnWrapper}>
        <Button className={styles.btn}>{t('offerCooperation')}</Button>

        <Link to={`/application/${id}`}>
          <Button className={styles.rightBtn}>
            <Right className={styles.rigthIcon} />
          </Button>
        </Link>
      </div>
    </div>
  );
};
