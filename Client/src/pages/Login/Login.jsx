import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import image from '../../assets/login.png';
import { storeContext } from '../../context/StoreContext';
import { toast } from "react-toastify";
import Swal from 'sweetalert2';
import axios from 'axios';
import Loading from '../../components/Loading';
import styles from './Login.module.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import eye icons

const Login = () => {
  const { url, checkUser, loading, setLoading } = useContext(storeContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false); // State for password visibility

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
        await checkUser();
        Swal.fire({
          title: 'Welcome!',
          text: `Logged in successfully as ${res.data.fullName}!`,
          icon: 'success',
          confirmButtonText: 'OK',
          timer: 3000,
          timerProgressBar: true,
        }).then(() => {
          navigate('/');
        });
      }
    } catch (err) {
      console.log(err);
      toast.error(err?.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
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
    </div>
  );
};

export default Login;