import React, { useState } from 'react';
import Select from 'react-select';
import styles from './styles.module.less';
import {
  STATUS_OPTIONS,
  SCHOOLBOY_OPTIONS,
  STUDENT_OPTIONS,
  POSTGRADUATE_OPTIONS,
  TEACHER_OPTIONS,
  RESEARCHER_OPTIONS,
  SPECIALIST_OPTIONS,
  STARTUP_OPTIONS,
  COMMERCIALORGANIZATION_OPTIONS,
  SCIENTIFICORGANIZATION_OPTIONS,
  NONPROFITORGANIZATION_OPTIONS,
  INVESTOR_OPTIONS,
  // @ts-ignore
} from 'src/constants/profileConstants';

interface Props {
  options?: object;
  status?: any;
  grade?: any;
  onChange?: (option: any) => void;
  className?: string;
  isStatus?: boolean;
  value?: any;
  classNamePrefix?: string;
  placeholder?: string;
}

export const Status: React.FC<Props> = ({ onChange, status, value, placeholder, className, isStatus, classNamePrefix }) => {
  const changeOptions = () => {
    switch (status?.value) {
      case 'schoolboy':
        return SCHOOLBOY_OPTIONS;
      case 'student':
        return STUDENT_OPTIONS;
      case 'postgraduate':
        return POSTGRADUATE_OPTIONS;
      case 'teacher':
        return TEACHER_OPTIONS;
      case 'researcher':
        return RESEARCHER_OPTIONS;
      case 'specialist':
        return SPECIALIST_OPTIONS;
      case 'startup':
        return STARTUP_OPTIONS;
      case 'commercialOrganization':
        return COMMERCIALORGANIZATION_OPTIONS;
      case 'scientificOrganization':
        return SCIENTIFICORGANIZATION_OPTIONS;
      case 'nonProfitOrganization':
        return NONPROFITORGANIZATION_OPTIONS;
      case 'investor':
        return INVESTOR_OPTIONS;
    }
  };

  return (
    <div className={styles.wrapper}>
      <Select
        classNamePrefix={classNamePrefix}
        className={className}
        options={isStatus === true ? STATUS_OPTIONS : changeOptions()}
        onChange={onChange}
        placeholder={placeholder}
        value={value}
      />
    </div>
  );
};
