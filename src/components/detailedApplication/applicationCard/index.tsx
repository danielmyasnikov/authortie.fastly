import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from 'components/common/button';
import { useParams, Link } from 'react-router-dom';
import Key from 'assets/key.svg';
import { Tag } from './../tag';

import styles from './styles.module.less';

export const ApplicationCard = ({
  knowledgeAreaList,
  workTypeList,
  keywordList,
  title,
  comment,
  approxDate,
}) => {
  const { t } = useTranslation('card');
  return (
    <div className={styles.cardWrap}>
      <div className={styles.tagWrapper}>
        <Tag className={styles.workType}>{t(workTypeList[0])}</Tag>

        {knowledgeAreaList.length > 0 &&
          knowledgeAreaList.map((item: any) => (
            <React.Fragment key={item}>
              <Tag className={styles.knowledgeArea}>{item}</Tag>
            </React.Fragment>
          ))}
      </div>
      <span className={styles.title}>{title}</span>

      <span className={styles.subtitle}>{t('comment')}</span>
      <span className={styles.text}>{comment}</span>
      <span className={styles.subtitle}>Срок</span>
      <span className={styles.text}>{approxDate}</span>
      <div className={styles.keywordsWrapper}>
        {keywordList.length > 0 &&
          keywordList.map((item: any) => (
            <React.Fragment key={item}>
              <Tag className={styles.tagKey}>
                <Key />
                {item}
              </Tag>
            </React.Fragment>
          ))}
      </div>
    </div>
  );
};

{
  /* {isGuest && (
<Link className={styles.toReview} to={`/review/${id}`}>
    {t('addReview')}
  </Link>
)} */
}

{
  /* {!postingId && isGuest && (
  <Button onClick={() => setOfferCooperation(true)}>{t('offerCooperation')}</Button>
)}
{!!postingId && isGuest && <Button>{t('toDialog')}</Button>}
{!isGuest && (
  <Link to={`/edit/${params.id}`}>
    <Button>{t('edit')}</Button>
  </Link>
)} */
}
