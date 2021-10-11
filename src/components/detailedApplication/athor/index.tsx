import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Star from 'assets/star.svg';
import DefaultAvatar from 'assets/avatar.jpg';
import ChevronDuoRight from 'assets/chevron_duo_right.svg';
import styles from './styles.module.less';

interface Props{
  avatar: any,
  friendlyUrl: any,
  firstName: any,
  lastName: any,
  middleName: any,
  country: any,
  affiliation: any,
  degreeCategory: any,
  degree: any,
  reputationScore: any,
  countOffers: any,
  regoDate: any,
}

export const Author: React.FC<Props> = ({
  avatar,
  friendlyUrl,
  firstName,
  lastName,
  middleName,
  country,
  affiliation,
  degreeCategory,
  degree,
  reputationScore,
  countOffers,
  regoDate,
}) => {
  const { t } = useTranslation('card');
  return (
    <div className={styles.profileWrapper}>
      <div className={styles.personWrap}>
        <Link to={`/profile/${friendlyUrl}`} className={styles.avatarWrapper}>
          <img className={styles.avatar} src={avatar ? avatar : DefaultAvatar} alt="" />
        </Link>

        <div className={styles.personInfo}>
          <span className={styles.name}>{`${firstName} ${lastName} ${middleName}`}</span>
          <span className={styles.firstText}>{`${t(degree)} ${degreeCategory}`}</span>
          <span>{affiliation}</span>
        </div>
        <div className={styles.rating}>
          <Star />
          <span>{reputationScore}</span>
        </div>
      </div>
      <div className={styles.aboutWrap}>
        <p className={styles.aboutText}>
          <span className={styles.name}>Страна:</span>
          {country}
        </p>
        <p className={styles.aboutText}>
          <span className={styles.name}>Дата регистрации:</span>
          {regoDate}
        </p>
        <p className={styles.aboutText}>
          <span className={styles.name}>Количество заявок:</span>
          {countOffers}
        </p>
      </div>
      <Link to={`/profile/${friendlyUrl}`} className={styles.toProfileBtn}>
        {'Перейти в профиль'} <ChevronDuoRight className={styles.chevron} />
      </Link>
    </div>
  );
};
