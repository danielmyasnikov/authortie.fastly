import React, { Fragment } from 'react';
import cn from 'classnames';
import { useTranslation } from 'react-i18next';
import { RadioButton } from 'components/common/radioBtn';
import RoundRowRight from 'assets/roundRowRight.svg';
import Expand from 'assets/expand.svg';
import { WhoIAm } from './applicationForm';
import css from './css.module.less';

interface Props {
  whoIAm: WhoIAm;
  moreList: boolean;
  setMoreList: (value: boolean) => void;
  valid: any;
  index?: number;
  workTypes: {
    category: string;
    list: {
      value: string;
      checked: boolean;
      id: string;
    }[];
  }[];
  handleRadioList(id: string): void;
}

export const RadioTypes: React.FC<Props> = ({
  whoIAm,
  valid,
  moreList,
  workTypes,
  index,
  handleRadioList,
  setMoreList,
}) => {
  const { t } = useTranslation('application');
  const shortList = whoIAm === WhoIAm.CUSTOMER ? [workTypes[0], workTypes[1]] : workTypes;

  const listArray = moreList && whoIAm === WhoIAm.CUSTOMER ? workTypes : shortList;
  return (
    <div className={css.radioBlock}>
      <span className={css.subtile}>
        <RoundRowRight className={css.subtileIcon} />
        {whoIAm === WhoIAm.CUSTOMER ? t('want') : t('suggest')}
      </span>
      <div
        className={cn(css.listBlock, {
          [css.errorWrapper]: !!valid.workName,
          [css.openBlok]: moreList && whoIAm === WhoIAm.CUSTOMER,
          [css.relative]: !moreList && whoIAm === WhoIAm.CUSTOMER,
        })}
      >
        {listArray.map(({ category, list }: { category: string; list: any[] }, i: number) => (
          <div key={category + index + i}>
            {moreList && <p className={css.subtileOpenBlok}>{category}</p>}
            {list
              && list.length
              && list.map(
                (
                  { checked, id, value }: { checked: boolean; id: string; value: string },
                  i: number,
                ) => (
                  <Fragment key={category + id + index + i}>
                    {value && (
                      <RadioButton
                        checked={!!checked}
                        id={`${String(id)}_${index}`}
                        name={`${String(id)}_${index}`}
                        label={t(value)}
                        onChange={() => handleRadioList(id)}
                        isColor
                      />
                    )}
                  </Fragment>
                ),
              )}
          </div>
        ))}

        {whoIAm === WhoIAm.CUSTOMER && (
          <span className={css.moreBtn} onClick={() => setMoreList(!moreList)}>
            {moreList ? <Expand /> : 'Полный список'}
          </span>
        )}
      </div>
      {!!valid.radioBlock && <span className={css.error}>{valid.radioBlock}</span>}
    </div>
  );
};
