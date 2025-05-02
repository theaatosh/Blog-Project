import styles from "../Footer/Footer.module.css";
import { AiFillInstagram } from "react-icons/ai";
import { FaFacebook } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
// import { IoSend } from "react-icons/io5";
const Footer = () => {
  return (
    <footer>
      <div className={styles.upper_div}>
        <h2>Get connected with us in our social sites:</h2>
        <div className={styles.icons_div}>
          <AiFillInstagram className={styles.icon} />
          <FaFacebook className={styles.icon} />
          <FaSquareXTwitter className={styles.icon} />
        </div>
      </div>

      <div className={styles.lower_div}>
        <div className={styles.div_1}>
          <h2>Blog Spot</h2>
          <p>Unleash Ideas, Explore Stories, and Share Knowledge!</p>
        </div>

        <div className={styles.div_2}>
          <h2>Quick Links</h2>
          <ul>
            <li>Home</li>
            <li>About</li>
            <li>Contact</li>
            <li>Blogs</li>
          </ul>
        </div>

        <div className={styles.div_3}>
          <h2>Follow us for more updates</h2>
          {/* <div className={styles.input_con}>
            <input type="email"  placeholder='Enter your email'/>
            <IoSend className={styles.send_icon}/>
          </div> */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
