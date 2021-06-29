import React from 'react';
import styles from './styles.module.less';

interface Props {
  placeholder?: string;
  onChange: (value: string) => void;
  value: string;
}

export const Textarea: React.FC<Props> = ({ placeholder, value, onChange }) => {
  return (
    <textarea
      placeholder={placeholder}
      className={styles.textarea}
      onChange={(e) => onChange(e.target.value)}
      value={value}
    />
  );
};
