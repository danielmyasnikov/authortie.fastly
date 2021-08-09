import React from 'react';
import cn from 'classnames';

import css from './style.module.less';

type Props = {
  id: string;
  checked: boolean;
  name: string;
  className?: string;
  label?: string;
  onChange: () => void;
  isColor?: boolean;
};

export const Checkbox: React.FC<Props> = ({ id, checked, className, label, onChange, name, isColor }) => (
  <label
    htmlFor={id}
    className={cn(css.checkbox, className, {
      [css.color]: isColor,
      [css.checkedCheckbox]: isColor && checked,
      [css.checkedCheckboxDefault]: !isColor && checked,
    })}
  >
    <input id={id} type="checkbox" name={name} checked={checked} onChange={onChange} />
    <span className={css.checkedIcon}>
      <div />
    </span>
    <p className={css.label}>{label}</p>
  </label>
);
