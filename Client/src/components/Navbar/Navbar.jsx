import styles from './Navbar.module.css';
import { IoIosMenu } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { Link, NavLink } from "react-router-dom";
import Button from '../Button/Button';
import { useState, useEffect, useContext, useRef } from "react";
import { motion } from "framer-motion";
import { storeContext } from '../../context/StoreContext';

const Navbar = () => {
  const { user, logOutUser } = useContext(storeContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const userDropDownRef = useRef(null);

  // Toggle mobile menu
  const handleMenuToggle = () => {
    setIsMenuOpen(prev => !prev);
    if (isDropdownOpen) setIsDropdownOpen(false);
  };

  // Toggle dropdown
  const handleDropdownToggle = (e) => {
    e.stopPropagation(); // Prevent event from bubbling to window
    setIsDropdownOpen(prev => !prev);
    if (isMenuOpen) setIsMenuOpen(false);
  };

  // Scroll handler
  const handleScroll = () => {
    const currentScrollY = window.scrollY;
    const halfScreenHeight = window.innerHeight / 2;

    if (currentScrollY < lastScrollY || currentScrollY === 0) {
      setShowNavbar(true);
    } else if (currentScrollY > halfScreenHeight && currentScrollY > lastScrollY) {
      setShowNavbar(false);
    }

    setLastScrollY(currentScrollY);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (userDropDownRef.current && !userDropDownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };

    window.addEventListener('click', handleClickOutside);

    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, []); // Removed isDropdownOpen dependency

  const handleLogout = () => {
    setIsDropdownOpen(false); // Close dropdown
    logOutUser();
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  // Get user initials
  const getInitials = (fullName) => {
    if (!fullName) return "U";
    const names = fullName.trim().split(" ");
    const firstInitial = names[0]?.[0] || "";
    const lastInitial = names.length > 1 ? names[names.length - 1][0] : "";
    return `${firstInitial}${lastInitial}`.toUpperCase();
  };

  // Animation variants
  const navbarVariants = {
    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 300, damping: 40 } },
    hidden: { y: "-100%", opacity: 0, transition: { type: "spring", stiffness: 300, damping: 20 } },
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
          <NavLink to='/' className={({ isActive }) => (isActive ? styles.active : "")}>
            <li className={styles.list}>Home</li>
          </NavLink>
          <NavLink to='/aboutus' className={({ isActive }) => (isActive ? styles.active : "")}>
            <li className={styles.list}>About</li>
          </NavLink>
          <NavLink to='/contactus' className={({ isActive }) => (isActive ? styles.active : "")}>
            <li className={styles.list}>Contact</li>
          </NavLink>
          <NavLink to='/blogs' className={({ isActive }) => (isActive ? styles.active : "")}>
            <li className={styles.list}>Blogs</li>
          </NavLink>
        </ul>

        <div className={styles.auth_div}>
          {user ? (
            <div className={styles.userContainer} ref={userDropDownRef}>
              <div className={styles.circle} onClick={handleDropdownToggle}>
                <span className={styles.initials}>{user?.photo&&<img src={user.photo} style={{width:'100%',height:'100%',borderRadius:'50%',objectFit:'cover'}}/>||getInitials(user.fullName)}</span>
              </div>
              {isDropdownOpen && (
               <ul className={styles.dropdown}>
  <li>
    <Link to={`/profile/${user._id}`} onClick={handleDropdownToggle}>
      Profile
    </Link>
  </li>
  <li>
    <Link to={`/myblogs/${user._id}`} onClick={handleDropdownToggle}>
      My Blogs
    </Link>
  </li>
  <li onClick={handleLogout}>Logout</li>
</ul>
              )}
            </div>
          ) : (
            <NavLink to='/login'>
              <Button text={"Login"} path={'/login'} />
            </NavLink>
          )}
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
              <NavLink to='/' className={({ isActive }) => (isActive ? styles.active : "")} onClick={handleMenuToggle}>
                <li className={styles.mob_list}>Home</li>
              </NavLink>
              <NavLink to='/aboutus' className={({ isActive }) => (isActive ? styles.active : "")} onClick={handleMenuToggle}>
                <li className={styles.mob_list}>About</li>
              </NavLink>
              <NavLink to='/contactus' className={({ isActive }) => (isActive ? styles.active : "")} onClick={handleMenuToggle}>
                <li className={styles.mob_list}>Contact</li>
              </NavLink>
              <NavLink to='/blogs' className={({ isActive }) => (isActive ? styles.active : "")} onClick={handleMenuToggle}>
                <li className={styles.mob_list}>Blogs</li>
              </NavLink>
              <div>
                {user ? (
                  <>
                    <Link to={`/profile/${user._id}`} onClick={handleMenuToggle}>
                      <Button text={"Profile"} />
                    </Link>
                    <Button text={"Logout"} onClick={logOutUser} />
                  </>
                ) : (
                  <Link to='/login' onClick={handleMenuToggle}>
                    <Button text={"Login"} path={'/login'} />
                  </Link>
                )}
              </div>
            </ul>
          </motion.div>
        )}
      </nav>
    </motion.header>
  );
};

export default Navbar;