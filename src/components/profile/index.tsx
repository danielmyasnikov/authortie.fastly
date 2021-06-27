import React, { useRef, useState } from 'react';
import Select from 'react-select';
import Camera from 'assets/camera.svg';
import Pencil from 'assets/pencil.svg';
import styles from './styles.module.less';

export const Profile = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [avatarURL, setAvatarURL] = useState<string>('');

  const getDataUrlFromFile = (file: File | Blob): Promise<string> =>
    new Promise((resolve) => {
      const reader = new FileReader();

      reader.addEventListener('load', () => {
        resolve(reader.result as string);
      });

      reader.readAsDataURL(file);
    });

  function handleFileInputChanged(event: React.FormEvent<HTMLInputElement>) {
    const [file] = event.target.files || [];

    // добавить проверу размера файла
    // handleChangeFile(file);

    getDataUrlFromFile(file).then((fileUrl) => setAvatarURL(`${fileUrl}`));

  }

  const handleUploadAvatarBtnClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  console.log(avatarURL);
  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <div className={styles.profileWrapper}>
          {avatarURL ? (
            <img className={styles.img} src={avatarURL} alt="" />
          ) : (
            <Camera className={styles.defaultPhoto} />
          )}

          <div className={styles.pencil} onClick={handleUploadAvatarBtnClick}>
            <form>
              <input
                hidden
                onChange={handleFileInputChanged}
                ref={fileInputRef}
                type="file"
                id="avatar"
                accept=".png, .jpg, .jpeg"
              />
            </form>

            <Pencil />
          </div>
        </div>
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
