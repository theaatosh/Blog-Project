import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { storeContext } from '../../context/StoreContext';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import axios from 'axios';
import Swal from 'sweetalert2';

import styles from './Signup.module.css';

const Signup = () => {
  const navigate = useNavigate();
  const { url } = useContext(storeContext);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      fullName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    };

    // Full Name validation
    if (!formData.fullName.trim() || !/^[A-Za-z\s]+$/.test(formData.fullName)) {
      newErrors.fullName = 'Full name must contain only letters and spaces';
      isValid = false;
    }

    // Email validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
      isValid = false;
    }

    // Phone number validation
    if (!/^9\d{9}$/.test(formData.phone)) {
      newErrors.phone = 'Phone number must be 10 digits starting with 9';
      isValid = false;
    }

    // Password validation
    if (!/^(?=.*[A-Z])(?=.*\d).{8,}$/.test(formData.password)) {
      newErrors.password = 'Password must be at least 8 characters with one uppercase letter and one digit';
      isValid = false;
    }

    // Confirm password validation
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    // Clear error when user starts typing
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      const res = await axios.post(`${url}/user/register`, formData);
      if (res.status === 200) {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: res.data.message,
        });
        const email = res?.data?.email;
        navigate('/otp-verify', { state: { email } });
      }
    } catch (err) {
      console.log("Network error:", err);
      Swal.fire({
        icon: 'error',
        title: 'Registration Failed',
        text: err?.response?.data?.message || 'Registration failed',
      });
    }
  };

  return (
    <div className={styles['register-container']}>
      <div className={styles['register-inner-container']}>
        <div className={styles['register-form-container']}>
          <h2 className={styles['register-title']}>Create a New Account</h2>
          <form onSubmit={handleSubmit} className={styles['register-form']} aria-label="Signup form">
            <div className={styles['form-row']}>
              <div className={styles['input-group']}>
                <label className={styles['input-label']}>Full Name</label>
                <input
                  type="text"
                  value={formData.fullName}
                  name="fullName"
                  onChange={handleOnChange}
                  className={styles['input-field']}
                  placeholder="Enter your full name"
                  
                />
                {errors.fullName && <span className={styles['error-message']}>{errors.fullName}</span>}
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
                  
                />
                {errors.email && <span className={styles['error-message']}>{errors.email}</span>}
              </div>
            </div>
            <div className={styles['form-row']}>
              <div className={styles['input-group']}>
                <label className={styles['input-label']}>Phone Number</label>
                <input
                  type="tel"
                  value={formData.phone}
                  name="phone"
                  onChange={handleOnChange}
                  className={styles['input-field']}
                  placeholder="Enter your phone number"
                  
                />
                {errors.phone && <span className={styles['error-message']}>{errors.phone}</span>}
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
                {errors.password && <span className={styles['error-message']}>{errors.password}</span>}
              </div>
            </div>
            <div className={styles['form-row']}>
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
                {errors.confirmPassword && <span className={styles['error-message']}>{errors.confirmPassword}</span>}
              </div>
              <div className={styles['input-group']}></div>
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