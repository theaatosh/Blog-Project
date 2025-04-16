import { useLocation } from 'react-router-dom';
import styles from './Button.module.css';

const Button = ({ text,path,onClick }) => {
  const location=useLocation();
  const isActive=location.pathname===path
  return (
    <div className={styles.btn_container} onClick={onClick}>
      <button className={`${styles.btn} ${isActive?styles.active:''}` }>
        <span className={styles.hover_div}></span>
        {text}
      </button>
    </div>
  );
};

export default Button;
