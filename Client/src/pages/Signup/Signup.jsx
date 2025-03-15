import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import image from '../../assets/login.png'
import './Signup.css'
import { storeContext } from "../../context/StoreContext";
import axios from 'axios'

const Signup=()=> {
  const {url}=useContext(storeContext)
  
  const [formData,setFormData]=useState({
    fullname:"",
    email:"",
    password:"",
    confirmPassword:""
  })

  const handleOnChange=(e)=>{
    const{name,value}=e.target
    setFormData((prevData)=>({
      ...prevData,[name]:value
    }))
  }

  const handleSubmit =async (e) => {
    e.preventDefault();
    try{
      const res=await axios.post(`${url}/user/register`);
      console.log(res);
      
    }catch(err){
      console.log(err);
      
    }
    
  };

  return (
    <div className="register-container">
      <div className="register-image-container">
        <img src={image} alt="Description" className="register-image" />
      </div>

      <div className="register-form-container">
        <h2 className="register-title">Create a New Account</h2>
        <form onSubmit={handleSubmit} className="register-form">
          <div className="input-group">
            <label className="input-label">Full Name</label>
            <input
              type="text"
              value={formData.fullname}
              name="fullname"
              onChange={handleOnChange}
              className="input-field"
              placeholder="Enter your full name"
              required
            />
          </div>
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
              name="password"
              value={formData.password}
              onChange={handleOnChange}
              className="input-field"
              placeholder="Enter your password"
              required
            />
          </div>
          <div className="input-group">
            <label className="input-label">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleOnChange}
              className="input-field"
              placeholder="Confirm your password"
              required
            />
          </div>
          <button type="submit" className="register-button">
            Sign Up
          </button>
        </form>
        <p className="register-text">
          Already have an account?{" "}
          <Link to="/Login" className="login">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
}
export default Signup