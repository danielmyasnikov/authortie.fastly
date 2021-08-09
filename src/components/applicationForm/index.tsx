import { useState } from 'react';
import { ApplicationForm } from './applicationForm';
import css from './css.module.less';

export const Application = () => {
  const [applicationsArray, setApplicationsArray] = useState<number[]>([0]);

  function addToArray() {
    setApplicationsArray([...applicationsArray , applicationsArray.length]);
  }

  return (
    <div className={css.wrapper}>
      <div className={css.content}>
        <h1 className={css.title}>Создание заявки</h1>
        {applicationsArray.map((_) => (
          <ApplicationForm addToArray={addToArray} />
        ))}
      </div>
    </div>
  );
};
