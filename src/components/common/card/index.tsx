import React from 'react';
import { useTranslation } from 'react-i18next';
import Camera from 'assets/camera.svg';
import { Tag } from './tag';
import { Button } from 'components/common/button';
import styles from './styles.module.less';

export const Card: React.FC = () => {
  const { t } = useTranslation('card');
  return (
    <div className={styles.wrapper}>
      <div className={styles.tagWrapper}>
        <Tag>Повысить цитируемость своих работ</Tag>
        <Tag>Engineering/Material</Tag>
      </div>

      <span className={styles.subTitle}>{t('workName')}</span>
      <span className={styles.text}>
        Вопросы проектирования трансатлантического межнационального продуктопровода в условиях
        нарастающей коронавирусной пандемии на примере использования методов дистанционного
        строительства при помощи 3D-принтера связующей основы
      </span>

      <span className={styles.subTitle}>{t('keyWord')}</span>
      <div className={styles.tagWrapper}>
        <Tag>Перове слово</Tag>
        <Tag>Второе слово</Tag>
      </div>

      <span className={styles.subTitle}>{t('coment')}</span>
      <span className={styles.coment}>
        Могу ещё помочь со статистической обработкой больших массивов
      </span>
      <span className={styles.subTitle}>{t('reward')}</span>
      <div className={styles.tagWrapper}>
        <Tag>Деньги</Tag>
        <span> 100$</span>
      </div>

      <div className={styles.personBlock}>
        <div className={styles.avatar}>
          <Camera className={styles.defaultPhoto} />
        </div>
        <div className={styles.personInfo}>
          <span className={styles.subTitle}>Артём Белоусов</span>
          <span className={styles.coment}>учёный (кандидат наук)</span>
          <span className={styles.coment}>Санкт-Петербургский горный университет</span>
        </div>
      </div>
      
      <Button className={styles.btn}>{t('offerCooperation')}</Button>
    </div>
  );
};
