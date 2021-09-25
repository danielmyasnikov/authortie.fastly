import React, { Fragment } from 'react';
import cn from 'classnames';
import Select from 'react-select';
import { useTranslation } from 'react-i18next';
import { Checkbox } from 'components/common/checkbox';
import RoundRowLeft from 'assets/roundRowLeft.svg';
import Expand from 'assets/expand.svg';

import { WhoIAm } from './applicationForm';

import css from './css.module.less';

interface Option {
  label: string;
  value: string;
}

interface Props {
  whoIAm: WhoIAm;
  moreList: boolean;
  setMoreList: (value: boolean) => void;
  valid: any;
  index?: number;
  handleCheckedList(id: string): void;
  sumCheck: boolean;
  setSumCheck: (value: boolean) => void;
  setCurrency: (value: Option) => void;
  sum?: string;
  handleSum(e: React.ChangeEvent<HTMLInputElement>): void;
  currencyOptions: Option[];
  currency?: Option;
  rewardTypes: {
    category: string;
    list: {
      value: string;
      checked: boolean;
      id: string;
    }[];
  }[];
}

export const CheckboxTypes: React.FC<Props> = ({
  whoIAm,
  valid,
  moreList,
  rewardTypes,
  index,
  handleCheckedList,
  sumCheck,
  setSumCheck,
  currencyOptions,
  currency,
  setCurrency,
  sum,
  handleSum,
  setMoreList,
}) => {
  const { t } = useTranslation('application');
  const shortList = whoIAm === WhoIAm.EXECUTOR ? [rewardTypes[0], rewardTypes[1]] : rewardTypes;
  const listArray = moreList && whoIAm === WhoIAm.EXECUTOR ? rewardTypes : shortList;

  const renderList = () =>
    listArray.map(({ category, list }: { category: string; list: any[] }, i: number) => (
      <div key={category + index + i}>
        {moreList && <p className={css.subtileOpenBlok}>{category}</p>}
        {list &&
          list.length &&
          list.map(
            (
              { checked, id, value }: { checked: boolean; id: string; value: string },
              i: number,
            ) => (
              <Fragment key={category + id + index + i}>
                {value && (
                  <Checkbox
                    checked={!!checked}
                    id={`${String(id)}_${index}`}
                    name={`${String(id)}_${index}`}
                    label={t(value)}
                    onChange={() => handleCheckedList(id)}
                    isColor
                  />
                )}
              </Fragment>
            ),
          )}
      </div>
    ));

  return (
    <div className={css.checkboxBlock}>
      <span className={css.subtile}>
        <RoundRowLeft className={css.subtileIcon} />
        {whoIAm === WhoIAm.EXECUTOR ? t('want') : t('suggest')}
      </span>
      <div
        className={cn(css.block, {
          [css.errorWrapper]: !!valid.checboxBlock,
          [css.openBlok]: moreList && whoIAm === WhoIAm.EXECUTOR,
          [css.listBlock]: moreList && whoIAm === WhoIAm.EXECUTOR,
          [css.relative]: !moreList,
        })}
      >
        {moreList && renderList()}
        {!moreList && (
          <div className={css.checkWrapper}>
            <div className={css.checkBlock}>{renderList()}</div>

            <div className={css.sumBlock}>
              <Checkbox
                checked={sumCheck}
                id={String(index)}
                name={String(index)}
                label={t('pay')}
                onChange={() => setSumCheck(!sumCheck)}
              />
              <div className={css.inputWrapper}>
                <input type="text" className={css.sumInput} value={sum} onChange={handleSum} />
                <Select
                  defaultValue={currencyOptions[0]}
                  classNamePrefix="CustomSelect"
                  value={currency}
                  options={currencyOptions}
                  onChange={(option: any) => setCurrency(option)}
                  isSearchable={false}
                />
              </div>
            </div>
          </div>
        )}

        {whoIAm === WhoIAm.EXECUTOR && (
          <span className={css.moreBtn} onClick={() => setMoreList(!moreList)}>
            {moreList ? <Expand /> : 'Полный список'}
          </span>
        )}
      </div>
      {!!valid.checboxBlock && <span className={css.error}>{valid.checboxBlock}</span>}
    </div>
  );
};
