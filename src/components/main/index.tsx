import React from 'react';
import { useTranslation } from 'react-i18next';

export const Main: React.FC = () => {
  const { t } = useTranslation('main');
  return <div>{t('howAreYou')}</div>;
};
