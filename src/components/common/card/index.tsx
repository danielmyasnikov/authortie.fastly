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
  coment: string;
  authorStatus: string;
  institution: string;
  author: string;
  title: string;
  target: string;
  fieldOfActivity: string;
  id: number;
}

export const Card: React.FC<Props> = ({
  privateAccaunt,
  keyWords,
  coment,
  author,
  institution,
  authorStatus,
  title,
  target,
  fieldOfActivity,
  id,
}) => {
  const { t } = useTranslation('card');

  const showWords = keyWords.slice(0, 3);
  const numberAfterShowWords = keyWords.length - 3;

  return (
    <div className={styles.wrapper}>
      {target.length > 25 && (
        <ReactTooltip
          id={`${target} + ${id}`}
          className={styles.tooltip}
          place="top"
          effect="solid"
        />
      )}
      {fieldOfActivity.length > 25 && (
        <ReactTooltip
          id={`${fieldOfActivity} + ${id}`}
          className={styles.tooltip}
          place="top"
          effect="solid"
        />
      )}

      <div className={styles.tagWrapper}>
        <Tag dataTip={target} dataFor={`${target} + ${id}`}>
          {target}
        </Tag>
        <Tag dataTip={fieldOfActivity} dataFor={`${fieldOfActivity} + ${id}`}>
          {fieldOfActivity}
        </Tag>
      </div>

      <span className={styles.subTitle}>{title}</span>

      <div className={styles.tagWrapper}>
        {showWords.map((word) => (
          <Tag>{word}</Tag>
        ))}

        {numberAfterShowWords > 0 && <Tag>{`+ ${numberAfterShowWords}`}</Tag>}
      </div>

      <span className={styles.text}>{t('coment')}</span>
      <span className={styles.coment}>{coment}</span>
      <span className={styles.text}>{t('reward')}</span>
      <div className={styles.tagWrapper}>
        <span> 100$</span>
      </div>

      <div className={styles.personBlock}>
        <div className={cn(styles.avatar, { [styles.blurAvatar]: privateAccaunt })}>
          <Camera className={styles.defaultPhoto} />
        </div>
        <div className={styles.personInfo}>
          <span className={styles.text}>{privateAccaunt ? t('private') : author}</span>
          <span className={styles.coment}>{authorStatus}</span>
          <span className={styles.coment}>{institution}</span>
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
