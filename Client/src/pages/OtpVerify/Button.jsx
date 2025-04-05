import styles from './Button.module.css'
export const Button = ({onClick,type,children}) => {
    return (
      <button onClick={onClick} type={type} className={styles.button}>{children} </button>
    )
  }
  
  
  