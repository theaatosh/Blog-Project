import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import image from '../../assets/login.png';
import { storeContext } from '../../context/StoreContext';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import eye icons

import axios from 'axios';
import { toast } from 'react-toastify';
import styles from './Signup.module.css';

const Signup = () => {
  const navigate = useNavigate();
  const { url } = useContext(storeContext);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${url}/user/register`, formData);
      if (res.status === 200) {
        toast.success(res.data.message);
        const email = res?.data?.email;
        navigate('/otp-verify', { state: { email } });
      }
    } catch (err) {
      console.log("Network error:", err);
      toast.error(err?.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className={styles['register-container']}>
      <div className={styles['register-inner-container']}>
        <div className={styles['register-image-container']}>
          <img src={image} alt="Signup illustration" className={styles['register-image']} />
        </div>
        <div className={styles['register-form-container']}>
          <h2 className={styles['register-title']}>Create a New Account</h2>
          <form onSubmit={handleSubmit} className={styles['register-form']} aria-label="Signup form">
            <div className={styles['input-group']}>
              <label className={styles['input-label']}>Full Name</label>
              <input
                type="text"
                value={formData.fullName}
                name="fullName"
                onChange={handleOnChange}
                className={styles['input-field']}
                placeholder="Enter your full name"
                required
              />
            </div>
            <div className={styles['input-group']}>
              <label className={styles['input-label']}>Email</label>
              <input
                type="email"
                value={formData.email}
                name="email"
                onChange={handleOnChange}
                className={styles['input-field']}
                placeholder="Enter your email"
                required
              />
            </div>
            <div className={styles['input-group']}>
              <label className={styles['input-label']}>Password</label>
              <div className={styles['input-wrapper']}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  name="password"
                  onChange={handleOnChange}
                  className={styles['input-field']}
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={styles['toggle-password']}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>
            <div className={styles['input-group']}>
              <label className={styles['input-label']}>Confirm Password</label>
              <div className={styles['input-wrapper']}>
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={formData.confirmPassword}
                  name="confirmPassword"
                  onChange={handleOnChange}
                  className={styles['input-field']}
                  placeholder="Confirm your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className={styles['toggle-password']}
                  aria-label={showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'}
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>
            <button type="submit" className={styles['register-button']}>
              Sign Up
            </button>
          </form>
          <p className={styles['register-text']}>
            Already have an account?{' '}
            <Link to="/login" className={styles.login}>
              Log In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;