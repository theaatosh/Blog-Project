import { useState } from "react";
import { Link } from "react-router-dom";
import image from '../../assets/login.png'
import "./Login.css";  
const Login = () => {
  const [formData,setFormData]=useState({
    email:"",
    password:"",
  })

  const handleOnChange=(e)=>{
    const{name,value}=e.target
    setFormData((prevData)=>({
      ...prevData,[name]:value
    }))
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Logging in with", formData);
  };

  return (
    <div className="login-container">
      <div className="login-image-container">
        <img src={image} alt="Description" className="login-image" />
      </div>

      <div className="login-form-container">
        <h2 className="login-title">Login</h2>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-group">
            <label className="input-label">Email</label>
            <input
              type="email"
              value={formData.email}
              name="email"
              onChange={handleOnChange}
              className="input-field"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="input-group">
            <label className="input-label">Password</label>
            <input
              type="password"
              value={formData.password}
              onChange={handleOnChange}
              name="password"
              className="input-field"
              placeholder="Enter your password"
              required
            />
          </div>
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
        <p className="login-text">
          Don&apos;t have an account?{" "}
          <Link to="/Registration" className="signup">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login
