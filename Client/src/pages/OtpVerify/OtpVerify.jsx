import { FaFingerprint } from "react-icons/fa";
import { Button } from './Button.jsx'
import { useContext, useEffect, useRef, useState } from "react";
import { replace, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import {toast } from 'react-toastify';
import Loading from  '../../components/Loading.jsx'
import styles from './OtpVerify.module.css'
import { storeContext } from "../../context/StoreContext.jsx";
export const OtpVerify = () => {
    const {url}=useContext(storeContext)
    const location=useLocation();
    const email=location.state?.email;
    

    const[isLoading,setIsLoading]=useState(false);
    const navigate = useNavigate();
    const ref1 = useRef(null);
    const ref2 = useRef(null);
    const ref3 = useRef(null);
    const ref4 = useRef(null);
    const ref5 = useRef(null);
    const ref6 = useRef(null);
    const inputRef = [ref1, ref2, ref3, ref4, ref5, ref6];

    const [otpCon, setOtp] = useState(['', '', '', '', '', '']); 

    const handleChange = (e, index) => {
        const updatedOtp = [...otpCon];
        updatedOtp[index] = e.target.value;
        setOtp(updatedOtp);

     
        if (index < 5 && e.target.value) {
            inputRef[index + 1].current.focus();
        }
    };

    useEffect(() => {
        if (ref1.current) {
            ref1.current.focus();
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const otp = otpCon.join('');
        console.log("OTP Submitted:", otp);
        
        try {
            setIsLoading(true);
            console.log("hello"+email,otp);
            
            const response = await axios.post(`${url}/user/register/verify`,{email,otp});
            console.log(response);
            
            if (response.status===200) {
                console.log(response.data.message);
                
                toast.success(response.data.message);
                navigate('/login',{replace:true});
            } 
        } catch (error) {
            console.log(error.response.data.message);
            
                        toast.error(error.response.data.message);
        }
        finally{
            setIsLoading(false);
        }
    };

    return (
        <div className={styles.otp_verify_main_con}>
            <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.form_inner}>
                    <div className={styles.upper}>
                        <FaFingerprint className={styles.fingerprint_icon} />
                        <h1 className={styles.heading}>Verify your OTP</h1>
                        <p className={styles.sub_heading}>
                            Enter 6 digit OTP here we just sent to your email
                        </p>
                    </div>
                    <div className={styles.lower}>
                        <div>
                            <label htmlFor="" className={styles.otp_label}>OTP *</label>
                            <div className={styles.otp_input_con}>
                                {inputRef.map((item, index) => (
                                    <input
                                        required
                                        ref={item}
                                        key={index}
                                        type="number"
                                        value={otpCon[index]} 
                                        onChange={(e) => handleChange(e, index)}
                                        onInput={(e) => {
                                            if (e.target.value.length > 1) {
                                                e.target.value = e.target.value.slice(0, 1);
                                            }
                                        }}
                                        className={styles.otp_input}
                                    />
                                ))}
                            </div>
                        </div>

                        <div className={styles.verify_btn}>
                            <Button type="submit">{isLoading?<Loading/>:"Verify"}</Button>
                        </div>

                    </div>
                </div>
            </form>
        </div>
    );
};
