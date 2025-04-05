import styles from './Navbar.module.css';
import { IoIosMenu } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { Link, NavLink } from "react-router-dom";
import Button from '../Button/Button';
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Toggle mobile menu
  const handleMenuToggle = () => {
    setIsMenuOpen(prev => !prev);
  };

  // Scroll handler
  const handleScroll = () => {
    const currentScrollY = window.scrollY;
    const halfScreenHeight = window.innerHeight / 2;

    // Show navbar when scrolling up or at top
    if (currentScrollY < lastScrollY || currentScrollY === 0) {
      setShowNavbar(true);
    } 
    // Hide navbar when scrolling down past half screen height
    else if (currentScrollY > halfScreenHeight && currentScrollY > lastScrollY) {
      setShowNavbar(false);
    }

    setLastScrollY(currentScrollY);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  // Animation variants
  const navbarVariants = {
    visible: { 
      y: 0,
      opacity: 1,
      transition: { 
        type: "spring",
        stiffness: 300,
        damping: 40
      }
    },
    hidden: { 
      y: "-100%",
      opacity: 0,
      transition: { 
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    }
  };

  return (
    <motion.header
      className={styles.wrapper_container}
      variants={navbarVariants}
      initial="visible"
      animate={showNavbar ? "visible" : "hidden"}
    >
      
      <nav className={styles.nav_container}>
        <Link to='/'>
          <div className={styles.logo_div}>Blog Spot</div>
        </Link>
        
        <ul className={styles.nav_list}>
          <NavLink to='/' className={({isActive}) => isActive ? styles.active : ""}>
            <li className={styles.list}>Home</li>
          </NavLink>
          <NavLink to='/aboutus' className={({isActive}) => isActive ? styles.active : ""}>
            <li className={styles.list}>About</li>
          </NavLink>
          <NavLink to='/contactus' className={({isActive}) => isActive ? styles.active : ""}>
            <li className={styles.list}>Contact</li>
          </NavLink>
          <NavLink to='/blogs' className={({isActive}) => isActive ? styles.active : ""}>
            <li className={styles.list}>Blogs</li>
          </NavLink>
        </ul>

        <div className={styles.auth_div}>
          <NavLink to='/login'>
            <Button text={"Login"} path={'/login'} />
          </NavLink>
          {/* <NavLink to='/signup'><Button text={"Signup"} path={'/signup'}/></NavLink> */}
        </div>

        <div className={styles.small_menu_container} onClick={handleMenuToggle}>
          {isMenuOpen ? <RxCross2 /> : <IoIosMenu />}
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <motion.div 
            className={styles.mobile_view_list}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <ul className={styles.mob_nav_list}>
              <NavLink to='/' className={({isActive}) => isActive ? styles.active : ""} onClick={handleMenuToggle}>
                <li className={styles.mob_list}>Home</li>
              </NavLink>
              <NavLink to='/aboutus' className={({isActive}) => isActive ? styles.active : ""} onClick={handleMenuToggle}>
                <li className={styles.mob_list}>About</li>
              </NavLink>
              <NavLink to='/contactus' className={({isActive}) => isActive ? styles.active : ""} onClick={handleMenuToggle}>
                <li className={styles.mob_list}>Contact</li>
              </NavLink>
              <NavLink to='/blogs' className={({isActive}) => isActive ? styles.active : ""} onClick={handleMenuToggle}>
                <li className={styles.mob_list}>Blogs</li>
              </NavLink>
              <NavLink to='/login' onClick={handleMenuToggle}>
                <Button text={"Login"} path={'/login'} />
              </NavLink>
              <NavLink to='/signup' onClick={handleMenuToggle}>
                <Button text={"Signup"} path={'/signup'}/>
              </NavLink>
            </ul>
          </motion.div>
        )}
      </nav>
    </motion.header>
  );
};

export default Navbar;