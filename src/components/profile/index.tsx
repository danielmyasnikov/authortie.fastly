import React from 'react';
import Select from 'react-select';
import styles from './styles.module.less';

export const Profile = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <span className={styles.title}>Личная информация</span>
        <span className={styles.subtitle}>Имя</span>
        <input
          //   value={}
          name="name"
          id="name"
          className={styles.input}
          type="text"
          //   onChange={handleChange}
        />
        <span className={styles.subtitle}>Статус</span>
        <Select className={styles.block} />
        <Select />
        <span className={styles.subtitle}>Аффилиация</span>
        <input
          //   value={}
          name="name"
          id="name"
          className={styles.input}
          type="text"
          //   onChange={handleChange}
        />
        <span className={styles.subtitle}>О себе</span>
        <textarea className={styles.textarea} />
        <span className={styles.subtitle}>Страна </span>
        <Select />

        <span className={styles.subtitle}>Язык</span>
        <Select />

        <span className={styles.subtitle}>Ссылки</span>
      </div>
    </div>
  );
};
