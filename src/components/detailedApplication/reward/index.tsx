import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from 'components/common/button';

import { OfferType } from './../index';
import styles from './styles.module.less';

interface Props {
  rewardTypeList: any;
  rewardSum: any;
  rewardCurrency: any;
  offerType: any;
  setOfferType: any;
  interaction: any;
}

export const Reward: React.FC<Props> = ({
  rewardTypeList,
  rewardSum,
  rewardCurrency,
  offerType,
  setOfferType,
  interaction,
}) => {
  const { t } = useTranslation('card');
  const [offerCooperation, setOfferCooperation] = useState(false);
  return (
    <div className={styles.rewarWrapper}>
      <div className={styles.rewardTagWrapper}>
        {rewardTypeList.map((item: string) => (
          <>
            <div className={styles.rewardTag}>{item}</div>
            {item === 'money' && (
              <div className={styles.sum}>{`${rewardSum} ${rewardCurrency}`}</div>
            )}
          </>
        ))}
      </div>

      {interaction === 'i_interaction' && (
        <div className={styles.btnWrapper}>
          <div className={styles.iInteraction}>Сотрудничество предложено</div>
        </div>
      )}
      {interaction === 'interaction_to_me' && (
        <div className={styles.btnWrapper}>
          <button className={styles.btn}>Перейти к диалогу</button>
        </div>
      )}
      {interaction === 'no_interaction' && (
        <div className={styles.btnWrapper}>
          {!offerCooperation ? (
            <button className={styles.btn} onClick={() => setOfferCooperation(true)}>
              {t('offerCooperation')}
            </button>
          ) : (
            <>
              <button
                className={styles.btn}
                onClick={() => setOfferType(OfferType.THERE_ARE_PUBLICATION)}
              >
                {t('hasApplication')}
              </button>
              <button
                className={styles.btn}
                onClick={() => setOfferType(OfferType.NEW_PUBLICATION)}
              >
                {t('newApplication')}
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};
