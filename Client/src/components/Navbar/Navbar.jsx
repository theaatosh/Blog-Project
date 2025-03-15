import { AiFillInstagram } from "react-icons/ai";
import { FaFacebook } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import styles from './Navbar.module.css'
import { IoIosMenu } from "react-icons/io";
import { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { Link } from "react-router-dom";
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
        <Link to='/'> <li className={styles.list}>Home</li></Link>
         <Link to='/aboutus'> <li className={styles.list}>About</li></Link>
          <Link to='contactus'><li className={styles.list}>Contact</li></Link>
          <Link to='/blogs'><li className={styles.list}>Blogs</li></Link>
         </ul>

         <div className={styles.auth_div}>
         <button>Login</button>
         <button>Signup</button>
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