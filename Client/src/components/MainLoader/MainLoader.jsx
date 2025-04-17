import styles from './MainLoader.module.css';


const MainLoader = ({ logoUrl, altText,fullScreen }) => {
  return (
    <div className={styles.loaderContainer}>
      <img
        src={logoUrl}
        alt={altText}
        className={styles.loaderLogo}
      />
    </div>
  );
};

export default MainLoader;