import styles from './styles.module.less';
import PageNotFoundPic from 'assets/pageNotFound.png';
import { Button } from 'components/common/button';
import { Link } from 'react-router-dom';

const PageNotFound = () => {
  return (
    <div className={styles.pageNotFound}>
      <div className={styles.content}>
        <div className={styles.title}>УПС!</div>
        <div className={styles.desc}>Мы не можем найти то, что Вы ищете</div>
        <img alt="" src={PageNotFoundPic} />
        <div className={styles.text && styles.reason}>
          Скорее всего, это случилось по одной из следующих причин: <br />
          страница переехала, страницы больше нет или Вам просто нравится <br />
          изучать 404 страницы.
        </div>
        <div className={styles.text && styles.comeBack}>
          Пожалуйста, вернитесь на главную страницу <br />и попробуйте заново.
        </div>
        <Link to='/'>
          <Button className={styles.btn}>На главную</Button>
        </Link>
      </div>
    </div>
  );
};

export default PageNotFound;
