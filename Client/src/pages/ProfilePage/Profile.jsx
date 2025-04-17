import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaCamera } from 'react-icons/fa';
import styles from './Profile.module.css';
import defaultUserPhoto from '/user.png';
import { toast } from 'react-toastify';
import axios from 'axios';
import { storeContext } from '../../context/StoreContext';

const ProfileComponent = () => {
  const { url } = useContext(storeContext);
  const { id } = useParams();
  const [userData, setUserData] = useState({
    fullName: '',
    photo: defaultUserPhoto,
    email: '',
    totalLikes: 0,
    numberOfBlogs: 0,
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditingUsername, setIsEditingUsername] = useState(false);
  const [isEditingPhoto, setIsEditingPhoto] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
  });

  // Fetch user details based on ID
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`${url}/user/fetch/${id}`, { withCredentials: true });
        const fetchedUser = response.data.data;
        setUserData({
          fullName: fetchedUser.fullName || '',
          photo: fetchedUser.photo || defaultUserPhoto,
          email: fetchedUser.email || '',
          totalLikes: fetchedUser.totalLikes || 0,
          numberOfBlogs: fetchedUser.numberOfBlogs || 0,
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
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const buttonVariants = {
    hover: { scale: 1.05, boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.1)' },
    tap: { scale: 0.95 },
  };

  // Handle changes to form fields
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'photo' && files && files[0]) {
      setIsEditingPhoto(true);
      const file = files[0];
      setUserData((prev) => ({ ...prev, photo: file }));
      setImagePreview(URL.createObjectURL(file));
    } else {
      setUserData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Handle password change inputs
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({ ...prev, [name]: value }));
  };

  const toggleEditUsername = () => {
    setIsEditingUsername(!isEditingUsername);
  };

  const toggleChangePassword = () => {
    setIsChangingPassword(!isChangingPassword);
    setPasswordData({ currentPassword: '', newPassword: '' }); // Reset password fields
  };

  // Handle profile update
  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('fullName', userData.fullName);
    formData.append('image', userData.photo);
    formData.append('email', userData.email);

    try {
      setIsLoading(true);
      const res = await axios.patch(`${url}/user/update`, formData, { withCredentials: true });
      if (res.status === 200) {
        toast.success(res?.data?.message);
        setUserData((prev) => ({
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
      setIsEditingUsername(false);
    }
  };

  // Handle password change
  const handlePasswordSubmit = async () => {
    if (!passwordData.currentPassword || !passwordData.newPassword) {
      toast.error('Please fill in both current and new password');
      return;
    }

    try {
      setIsLoading(true);
      const res = await axios.patch(
        `${url}/user/change-password`,
        {
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword,
        },
        { withCredentials: true }
      );
      if (res.status === 200) {
        toast.success(res?.data?.message || 'Password updated successfully');
        toggleChangePassword(); // Close password form
      }
    } catch (err) {
      console.error('Error changing password:', err);
      toast.error(err?.response?.data?.message || 'Failed to change password');
    } finally {
      setIsLoading(false);
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
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
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
          <label className={styles.label}>Total Likes:</label>
          <p className={styles.infoText}>{userData.totalLikes}</p>
        </motion.div>

        <motion.div className={styles.section} variants={itemVariants}>
          <label className={styles.label}>Number of Blogs Posted:</label>
          <p className={styles.infoText}>{userData.numberOfBlogs}</p>
        </motion.div>

        <motion.div className={styles.section} variants={itemVariants}>
          <label className={styles.label}>Change Password:</label>
          {isChangingPassword ? (
            <div className={styles.editContainer}>
              <input
                type="password"
                name="currentPassword"
                value={passwordData.currentPassword}
                onChange={handlePasswordChange}
                placeholder="Current Password"
                className={styles.inputField}
              />
              <input
                type="password"
                name="newPassword"
                value={passwordData.newPassword}
                onChange={handlePasswordChange}
                placeholder="New Password"
                className={styles.inputField}
              />
              <motion.button
                className={styles.saveButton}
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                onClick={handlePasswordSubmit}
              >
                Save Password
              </motion.button>
            </div>
          ) : (
            <div className={styles.infoContainer}>
              <motion.button
                className={styles.editButton}
                onClick={toggleChangePassword}
                whileHover={{ scale: 1.1 }}
              >
                Change Password
              </motion.button>
            </div>
          )}
        </motion.div>

        {(isEditingUsername || isEditingPhoto) && (
          <motion.button
            className={styles.saveButton}
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            onClick={handleSubmit}
          >
            Save Profile
          </motion.button>
        )}
      </motion.div>
    </div>
  );
};

export default ProfileComponent;