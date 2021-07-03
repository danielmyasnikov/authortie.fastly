import React from 'react';
import { useTranslation } from 'react-i18next';
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
  author: string;
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
  // const showWords = keyWords.slice(0, 3);
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
          <Tag>{word}</Tag>
        ))}
        {numberAfterShowWords > 0 && <Tag>{`+ ${numberAfterShowWords}`}</Tag>}
      </div>
      <div className={styles.personBlock}>
        <div className={cn(styles.avatar, { [styles.blurAvatar]: privateAccaunt })}>
          <Camera className={styles.defaultPhoto} />
        </div>
        <div className={styles.personInfo}>
          <span className={styles.text}>{privateAccaunt ? t('private') : author}</span>
          <span className={styles.comment}>{authorStatus}</span>
          <span className={styles.comment}>{institution}</span>
        </div>
      </div>

      <div className={styles.btnWrapper}>
        <Button className={styles.btn}>{t('offerCooperation')}</Button>
        <a href="https://www.google.ru/" target="_blank">
          <Button className={styles.rightBtn}>
            <Right className={styles.rigthIcon} />
          </Button>
        </a>
      </div>
    </div>
  );
};

// keyword_list: ["слово; word; key word;"]
// knowledge_area_list: "chemistry;engineering_material;humanities_arts"
// landing_approved: false
// moderation_approved: false
// posting_id: null
// request_type: null
// reward_comment: ""
// reward_currency: ""
// reward_sum: 1000
// reward_type: "money"
// secreted: false
// status: "init"
// title: "Вопросы проектирования трансатлантического межнационального продуктопровода в условиях нарастающей коронавирусной пандемии на примере использования методов дистанционного строительства при помощи 3D-принтера связующей основы"
// updated_at: "2021-07-03T12:29:54.359Z"
// user_id: 55
// work_type: "cite_mines"
