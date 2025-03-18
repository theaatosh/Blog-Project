
import styles from './Navbar.module.css'
import { IoIosMenu } from "react-icons/io";
import { useContext, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { Link, NavLink } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from '../Button/Button';
const Navbar = () => {
  const [isMenuOpen,setIsMenuOpen]=useState(false)

  const handleMenuToggle=()=>{
    setIsMenuOpen((prev)=>!prev)
  }
  return (
    <header className={styles.wrapper_container}>
       <ToastContainer position="top-right" autoClose={3000} />
      <nav className={styles.nav_container}>
       <Link to='/'><div className={styles.logo_div}>Blog Spot</div></Link>
        <ul className={styles.nav_list}>
        <NavLink to='/' className={({isActive})=>isActive?styles.active:""} > <li className={styles.list}>Home</li></NavLink>
         <NavLink to='/aboutus' className={({isActive})=>isActive?styles.active:""}> <li className={styles.list}>About</li></NavLink>
          <NavLink to='contactus' className={({isActive})=>isActive?styles.active:""}><li className={styles.list}>Contact</li></NavLink>
          <NavLink to='/blogs' className={({isActive})=>isActive?styles.active:""}><li className={styles.list}>Blogs</li></NavLink>
         </ul>

         <div className={styles.auth_div}>
         <NavLink to='/login'><Button text={"Login"} path={'/login'} /></NavLink>
         {/* <NavLink to='/signup'><Button text={"Signup"} path={'/signup'}/></NavLink> */}
         </div> 


         <div className={styles.small_menu_container} onClick={handleMenuToggle}>
         {isMenuOpen?<RxCross2 />: <IoIosMenu />}
         </div>


        {/* works for menu bar  */}
        {isMenuOpen&&
        <div className={styles.mobile_view_list}>
        <ul className={styles.mob_nav_list}>
        <NavLink to='/' className={({isActive})=>isActive?styles.active:""} onClick={handleMenuToggle} > <li className={styles.mob_list}>Home</li></NavLink>
         <NavLink to='/aboutus' className={({isActive})=>isActive?styles.active:""} onClick={handleMenuToggle}> <li className={styles.mob_list}>About</li></NavLink>
          <NavLink to='contactus' className={({isActive})=>isActive?styles.active:""} onClick={handleMenuToggle}><li className={styles.mob_list}>Contact</li></NavLink>
          <NavLink to='/blogs' className={({isActive})=>isActive?styles.active:""} onClick={handleMenuToggle}><li className={styles.mob_list}>Blogs</li></NavLink>
         
          <NavLink to='/login'onClick={handleMenuToggle}><Button text={"Login"} path={'/login'} /></NavLink>
         <NavLink to='/signup' onClick={handleMenuToggle}><Button text={"Signup"} path={'/signup'}/></NavLink>
        </ul>
        </div>
        } 
      </nav>
    </header>
  )
}

export default Navbar