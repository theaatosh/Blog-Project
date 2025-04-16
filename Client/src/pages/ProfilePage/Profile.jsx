// ProfileComponent.jsx
import {  useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // Import useParams
import { motion } from 'framer-motion';
import { FaCamera } from 'react-icons/fa';
import styles from './Profile.module.css';
import defaultUserPhoto from '/user.png';
import { toast } from 'react-toastify';
import axios from 'axios';
import { storeContext } from '../../context/StoreContext';

const ProfileComponent = () => {
  const {url}=useContext(storeContext);
  const { id } = useParams(); // Get user ID from URL params
  const [userData, setUserData] = useState({
    fullName: '',
    photo: defaultUserPhoto,
    password: '',
    email: '',
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditingUsername, setIsEditingUsername] = useState(false);
  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [isEditingPhoto, setIsEditingPhoto] = useState(false);


  // Fetch user details based on ID
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`${url}/user/fetch/${id}`, { withCredentials: true });
        
        const fetchedUser = response.data.data; // Adjust based on your API response structure\\        
        setUserData({
          fullName: fetchedUser.fullName || '',
          photo: fetchedUser.photo || defaultUserPhoto,
          password: fetchedUser.password || '', // Typically not returned by API for security
          email: fetchedUser.email || '',
        });
        setImagePreview(fetchedUser.photo || defaultUserPhoto);
      } catch (err) {
        console.error('Error fetching user:', err);
        toast.error(err?.response?.data?.message || 'Failed to fetch user details');
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchUserDetails();
    }
  }, [id, url]);
  
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const buttonVariants = {
    hover: { scale: 1.05, boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)" },
    tap: { scale: 0.95 }
  };

  // Handle changes to form fields
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'photo' && files && files[0]) {
      setIsEditingPhoto(true);
    
      const file = files[0];
      setUserData(prev => ({ ...prev, photo: file })); // Store file object
      setImagePreview(URL.createObjectURL(file)); // Preview the image
    } else {
      setUserData(prev => ({ ...prev, [name]: value }));
    }
  };

  const toggleEditUsername = () => {
    setIsEditingUsername(!isEditingUsername);
  };

  const toggleEditPassword = () => {
    setIsEditingPassword(!isEditingPassword);
  };

  // Handle profile update
  const handleSubmit = async () => {
    console.log("editUser",isEditingUsername);
    console.log("editPass",isEditingPassword);
    


    const formData = new FormData();
    formData.append('fullName', userData.fullName);
    formData.append('image', userData.photo); // Send file object
    formData.append('password', userData.password);
    formData.append('email', userData.email);

    try {
      setIsLoading(true);
      const res = await axios.patch(`${url}/user/update`, formData, { withCredentials: true });
      if (res.status === 200) {
        toast.success(res?.data?.message);
        // Optionally update local state with response data
        setUserData(prev => ({
          ...prev,
          fullName: res.data.data.fullName,
          photo: res.data.data.photo,
          email: res.data.data.email,
        }));
        setImagePreview(res.data.data.photo || defaultUserPhoto);
      }
    } catch (err) {
      console.error('Error updating user:', err);
      toast.error(err?.response?.data?.message || 'Failed to update profile');
    } finally {
      setIsLoading(false);
      setIsEditingPhoto(false);
      setIsEditingPassword(false);
      setIsEditingUsername(false)
     
    }
  };

  return (
    <div className={styles.container}>
      <motion.div
        className={styles.profileContainer}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div className={styles.profileCircle} variants={itemVariants}>
          <motion.img 
            src={imagePreview || userData.photo || defaultUserPhoto}
            alt="Profile"
            className={styles.profileImage}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          />
          <label className={styles.cameraIcon}>
            <FaCamera />
            <input
              type="file"
              name="photo"
              accept="image/*"
              onChange={handleChange}
              className={styles.fileInput}
            />
          </label>
          {isLoading && (
            <div className={styles.loadingOverlay}>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className={styles.spinner}
              />
            </div>
          )}
        </motion.div>

        <motion.div className={styles.section} variants={itemVariants}>
          <label className={styles.label}>Full Name:</label>
          {isEditingUsername ? (
            <div className={styles.editContainer}>
              <input
                type="text"
                name="fullName"
                value={userData.fullName}
                onChange={handleChange}
                placeholder="New Full Name"
                className={styles.inputField}
              />
            </div>
          ) : (
            <div className={styles.infoContainer}>
              <p className={styles.infoText}>{userData.fullName}</p>
              <motion.button
                className={styles.editButton}
                onClick={toggleEditUsername}
                whileHover={{ scale: 1.1 }}
              >
                Edit
              </motion.button>
            </div>
          )}
        </motion.div>

        <motion.div className={styles.section} variants={itemVariants}>
          <label className={styles.label}>Email:</label>
          <input
            type="email"
            name="email"
            value={userData.email}
            disabled
            className={styles.inputField}
          />
        </motion.div>

        <motion.div className={styles.section} variants={itemVariants}>
          <label className={styles.label}>Password:</label>
          {isEditingPassword ? (
            <div className={styles.editContainer}>
              <input
                type="text"
                name="password"
                value={userData.password}
                onChange={handleChange}
                placeholder="New password"
                className={styles.inputField}
              />
            </div>
          ) : (
            <div className={styles.infoContainer}>
              <input type="password"  value={userData.password} disabled className={styles.inputField} style={{ border:"none" }} />
              <motion.button
                className={styles.editButton}
                onClick={toggleEditPassword}
                whileHover={{ scale: 1.1 }}
              >
                Edit
              </motion.button>
            </div>
          )}
          {(isEditingUsername || isEditingPassword||isEditingPhoto)?
          (<motion.button
            className={styles.saveButton}
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            onClick={handleSubmit} // Updated to call handleSubmit
          >
            Save
          </motion.button>):null}
           
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ProfileComponent;