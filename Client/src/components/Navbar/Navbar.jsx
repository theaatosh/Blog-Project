
import styles from './Navbar.module.css'
import { IoIosMenu } from "react-icons/io";
import { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { Link, NavLink } from "react-router-dom";
import Button from '../Button/Button';
const Navbar = () => {
  const [isMenuOpen,setIsMenuOpen]=useState(false)

  const handleMenuToggle=()=>{
    setIsMenuOpen((prev)=>!prev)
  }
  return (
    <header className={styles.wrapper_container}>
      <nav className={styles.nav_container}>
        <div className={styles.logo_div}>Blog Spot</div>
         
         <ul className={styles.nav_list}>
        <NavLink to='/' className={({isActive})=>isActive?styles.active:""} > <li className={styles.list}>Home</li></NavLink>
         <Link to='/aboutus'> <li className={styles.list}>About</li></Link>
          <Link to='contactus'><li className={styles.list}>Contact</li></Link>
          <Link to='/blogs'><li className={styles.list}>Blogs</li></Link>
         </ul>

         <div className={styles.auth_div}>
         <Link to='/login'><Button text={"Login"}/></Link>
         <Link to='/signup'><Button text={"Signup"}/></Link>
         </div> 


         <div className={styles.small_menu_container} onClick={handleMenuToggle}>
         {isMenuOpen?<RxCross2 />: <IoIosMenu />}
         </div>

        {isMenuOpen&&
        <div className={styles.mobile_view_list}>
        <ul className={styles.mob_nav_list}>
         <li className={styles.mob_list}>Home</li>
         <li className={styles.mob_list}>About</li>
         <li className={styles.mob_list}>Contact</li>
         <li className={styles.mob_list}>Blogs</li>
         <li className={styles.mob_list}>Login</li>
         <li className={styles.mob_list}>Signup</li>
        </ul>
        </div>
        } 
      </nav>
    </header>
  )
}

export default Navbar