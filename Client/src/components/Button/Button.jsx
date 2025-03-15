import styles from './Button.module.css';

const Button = ({ text }) => {
  return (
    <div className={styles.btn_container}>
      <button className={styles.btn}>
        <span className={styles.hover_div}></span>
        {text}
      </button>
    </div>
  );
};

export default Button;
