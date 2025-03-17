import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import image from '../../assets/login.png'
import { toast } from "react-toastify";
import {storeContext} from '../../context/StoreContext'

import axios from 'axios'
import "./Login.css";  
const Login = () => {
  const {url,token,setToken}=useContext(storeContext);
  const navigate=useNavigate();
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
  const handleSubmit = async(e) => {
    e.preventDefault();
    
    try{
      const res=await axios.post(`${url}/user/login`,formData)
      console.log(res);
      if(res.status===200){
        toast.success(res?.data?.message);
      
        navigate('/');

      }

    }catch(err){
      console.log(err);
      toast.error(err?.response?.data?.message)
    }
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
