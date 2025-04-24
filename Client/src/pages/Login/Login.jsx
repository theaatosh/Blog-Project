import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import image from '../../assets/login.png';
import { storeContext } from '../../context/StoreContext';
import { toast } from "react-toastify";
import Swal from 'sweetalert2';
import axios from 'axios';
import Loading from '../../components/Loading';
import styles from './Login.module.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Login = () => {
  const { url, checkUser, loading, setLoading,user } = useContext(storeContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [forgotPasswordStep, setForgotPasswordStep] = useState(null); // null, 'email', 'otp', 'new-password'
  const [forgotEmail, setForgotEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [resetToken, setResetToken] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
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
      setLoading(true);
      const res = await axios.post(`${url}/user/login`, formData, {
        withCredentials: true,
      });
      if (res.status === 200) {
        if(res.data.user.role==="admin"){
          navigate('/admin');
        }else{
          navigate('/');

        }

        await checkUser();
        Swal.fire({
          title: 'Welcome!',
          text: `Logged in as ${res.data.user.fullName}!`,
          icon: 'success',
          confirmButtonText: 'OK',
          timer: 3000,
          timerProgressBar: true,
        })
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const toggleNewPasswordVisibility = () => {
    setShowNewPassword((prev) => !prev);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  const handleForgotPasswordEmail = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post(`${url}/user/forgot-password`, { email: forgotEmail });
      if (res.status === 200) {
        setResetToken(res.data.resetToken); // Assuming backend returns a reset token
        toast.success('OTP sent to your email!');
        setForgotPasswordStep('otp');
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post(`${url}/user/verify-otp`, {
        email: forgotEmail,
        otp,
        resetToken, 
      });
      if (res.status === 200) {
        toast.success('OTP verified successfully!');
        setOtp("");
        setForgotPasswordStep('new-password');
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Invalid OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    try {
      setLoading(true);
      const res = await axios.post(`${url}/user/create-password`, {
        email: forgotEmail,
        newPassword,
        confirmPassword
      });
      if (res.status === 200) {
        toast.success('Password reset successfully!');
        setForgotPasswordStep(null);
        setForgotEmail("");
        setNewPassword("");
        setConfirmPassword("");
        setResetToken("");
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Failed to reset password');
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    setForgotPasswordStep(null);
    setForgotEmail("");
    setOtp("");
    setNewPassword("");
    setConfirmPassword("");
    setResetToken("");
  };

  return (
    <div className={styles['login-container']}>
      {loading && <Loading fullscreen />}
      <div className={styles['login-inner-container']}>
        <div className={styles['login-image-container']}>
          <img src={image} alt="Login illustration" className={styles['login-image']} />
        </div>
        <div className={styles['login-form-container']}>
          <h2 className={styles['login-title']}>Login</h2>
          <form onSubmit={handleSubmit} className={styles['login-form']}>
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
              <div className={styles['password-container']}>
                <input
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  name="password"
                  onChange={handleOnChange}
                  className={styles['input-field']}
                  placeholder="Enter your password"
                  required
                />
                <span
                  className={styles['eye-icon']}
                  onClick={togglePasswordVisibility}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
              <p className={styles['forgot-password']}>
                <span
                  onClick={() => setForgotPasswordStep('email')}
                  className={styles['forgot-password-link']}
                >
                  Forgot Password?
                </span>
              </p>
            </div>
            <button type="submit" className={styles['login-button']} disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
          <p className={styles['login-text']}>
            Don’t have an account?{' '}
            <Link to="/signup" className={styles.signup}>
              Sign up
            </Link>
          </p>
        </div>
      </div>

      {forgotPasswordStep === 'email' && (
        <div className={styles['modal-overlay']}>
          <div className={styles['modal-content']}>
            <h3 className={styles['modal-title']}>Reset Password</h3>
            <form onSubmit={handleForgotPasswordEmail}>
              <div className={styles['input-group']}>
                <label className={styles['input-label']}>Email</label>
                <input
                  type="email"
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  className={styles['input-field']}
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div className={styles['modal-buttons']}>
                <button
                  type="button"
                  className={styles['modal-cancel']}
                  onClick={closeModal}
                >
                  Cancel
                </button>
                <button type="submit" className={styles['modal-submit']} disabled={loading}>
                  {loading ? 'Sending...' : 'Send OTP'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {forgotPasswordStep === 'otp' && (
        <div className={styles['modal-overlay']}>
          <div className={styles['modal-content']}>
            <h3 className={styles['modal-title']}>Verify OTP</h3>
            <form onSubmit={handleVerifyOtp}>
              <div className={styles['input-group']}>
                <label className={styles['input-label']}>OTP</label>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className={styles['input-field']}
                  placeholder="Enter the OTP"
                  required
                />
              </div>
              <div className={styles['modal-buttons']}>
                <button
                  type="button"
                  className={styles['modal-cancel']}
                  onClick={closeModal}
                >
                  Cancel
                </button>
                <button type="submit" className={styles['modal-submit']} disabled={loading}>
                  {loading ? 'Verifying...' : 'Verify OTP'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {forgotPasswordStep === 'new-password' && (
        <div className={styles['modal-overlay']}>
          <div className={styles['modal-content']}>
            <h3 className={styles['modal-title']}>Set New Password</h3>
            <form onSubmit={handleResetPassword}>
              <div className={styles['input-group']}>
                <label className={styles['input-label']}>New Password</label>
                <div className={styles['password-container']}>
                  <input
                    type={showNewPassword ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className={styles['input-field']}
                    placeholder="Enter new password"
                    required
                  />
                  <span
                    className={styles['eye-icon']}
                    onClick={toggleNewPasswordVisibility}
                    aria-label={showNewPassword ? "Hide password" : "Show password"}
                  >
                    {showNewPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
              </div>
              <div className={styles['input-group']}>
                <label className={styles['input-label']}>Confirm Password</label>
                <div className={styles['password-container']}>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className={styles['input-field']}
                    placeholder="Confirm new password"
                    required
                  />
                  <span
                    className={styles['eye-icon']}
                    onClick={toggleConfirmPasswordVisibility}
                    aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                  >
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
              </div>
              <div className={styles['modal-buttons']}>
                <button
                  type="button"
                  className={styles['modal-cancel']}
                  onClick={closeModal}
                >
                  Cancel
                </button>
                <button type="submit" className={styles['modal-submit']} disabled={loading}>
                  {loading ? 'Updating...' : 'Update Password'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;