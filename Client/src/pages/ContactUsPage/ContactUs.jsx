import "./ContactUs.css";
import { FaLocationDot } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import { FaFacebook } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    image: null
  });
  const [imagePreview, setImagePreview] = useState(null);

  // Refs for scroll detection
  const headerRef = useRef(null);
  const formRef = useRef(null);
  const infoRef = useRef(null);

  // Detect when elements are in view
  const headerInView = useInView(headerRef, { margin: "-100px" });
  
  const formInView = useInView(formRef, { margin: "-100px" });
  
  const infoInView = useInView(infoRef, { margin: "-200px" });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, image: file }));
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // Animation variants
  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6,
        ease: "easeOut",
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.4 }
    }
  };

  return (
    <div className="contact-page-wrapper">
      <motion.div 
        ref={headerRef}
        className="contactUs"
        variants={sectionVariants}
        initial="hidden"
        animate={headerInView ? "visible" : "hidden"}
      >
        <motion.div className="contactUsContent" variants={childVariants}>
          <motion.div className="contactUShead" variants={childVariants}>
            <b>Contact Us</b>
          </motion.div>
          <motion.div className="contactUsDetails" variants={childVariants}>
            <b>
              We&apos;d love to hear from you! Share your thoughts, questions, or collaboration ideas.
            </b>
          </motion.div>
        </motion.div>
        <motion.div 
          className="contactUsImg"
          variants={childVariants}
        />
      </motion.div>

      <motion.div 
        className="contactUsForm"
        variants={sectionVariants}
        initial="hidden"
        animate={formInView || infoInView ? "visible" : "hidden"}
      >
        <motion.div 
          ref={infoRef}
          className="locationInfo" 
          variants={childVariants}
        >
          <div className="manageInfoDiv">
            {[
              { icon: <FaLocationDot />, head: "Address", details: "Sallaghari, Bhaktapur" },
              { icon: <FaPhoneAlt />, head: "Phone", details: "9800000000" },
              { icon: <MdEmail />, head: "Email", details: "blog@gmail.com" }
            ].map((info, index) => (
              <motion.div 
                key={index}
                className="manageInfo"
                variants={childVariants}
                whileHover={{ x: 10 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="icons">{info.icon}</div>
                <div className="infos">
                  <div className="infoHead"><b>{info.head}</b></div>
                  <div className="infoDetails">{info.details}</div>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="followUS">
            <motion.div className="followUsHead" variants={childVariants}>
              Follow Us
            </motion.div>
            <motion.div className="manageIcons" variants={childVariants}>
              {[RiInstagramFill, FaFacebook, FaSquareXTwitter].map((Icon, index) => (
                <motion.div
                  key={index}
                  className="icons"
                  whileHover={{ scale: 1.2, rotate: 360 }}
                  transition={{ type: "spring", stiffness: 260, damping: 20 }}
                >
                  <Icon />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>

        <motion.div 
          ref={formRef}
          className="letTalkForm"
          variants={childVariants}
        >
          <motion.div className="letTalkFormHead" variants={childVariants}>
            Let&apos;s Talk
          </motion.div>
          <form className="letTalkMainForm">
            {[
              { label: "Full Name", name: "name", type: "text" },
              { label: "Email", name: "email", type: "email" },
              { label: "Subject", name: "subject", type: "text" }
            ].map((field) => (
              <motion.div
                key={field.name}
                variants={childVariants}
                whileHover={{ scale: 1.02 }}
              >
                <label htmlFor={field.name}>{field.label}</label>
                <input
                  type={field.type}
                  id={field.name}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleInputChange}
                  placeholder={`Enter your ${field.label.toLowerCase()}`}
                  required
                />
              </motion.div>
            ))}

            <motion.div 
              className="messageTeaxtArea" 
              variants={childVariants}
              whileHover={{ scale: 1.02 }}
            >
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Enter your message"
                required
              />
            </motion.div>

            <motion.div variants={childVariants} whileHover={{ scale: 1.02 }}>
              <label htmlFor="image">Upload Image</label>
              <input
                type="file"
                id="image"
                name="image"
                accept="image/*"
                onChange={handleImageChange}
              />
            </motion.div>

            {imagePreview && (
              <motion.div
                className="image-preview"
                variants={childVariants}
              >
                <img src={imagePreview} alt="Preview" />
              </motion.div>
            )}

            <motion.div 
              className="submitBtn"
              variants={childVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <button type="submit">Send Message</button>
            </motion.div>
          </form>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ContactUs;