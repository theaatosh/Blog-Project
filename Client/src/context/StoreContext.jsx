import { createContext, useEffect, useState } from "react";
import axios from 'axios'
import { toast } from "react-toastify";


export const storeContext = createContext();

export const StoreContextProvider = ({ children }) => {
  const url = "http://localhost:5010";
  const [user,setUser]=useState(null);
  const[loading,setLoading]=useState(true);
  const [initialLoader,setInitialLoader]=useState(true);

  //function to logout user
  const logOutUser=async()=>{
    try{
      setLoading(true);
      
      const res=await axios.post(`${url}/user/logout`,{},{withCredentials:true}); 
      toast.success(res?.data?.message);
      setUser(null);
    }
    catch(err){
      console.log(err?.response?.data?.message);
    }
    finally{
      setLoading(false);
    }
    }

  //function to check whether user is logged in
  const checkUser=async()=>{
    try{
      setLoading(true);
      const res=await axios.get(`${url}/user/check-auth`,{withCredentials:true}); 
      
      if(res?.data?.isAuthenticated){
        console.log(res.data);
        
        setUser(res?.data?.username||null);
      }else{
        setUser(null);
      }
    }
    catch(err){
console.log(err?.response?.data?.message);
setUser(null);
    }
    finally{
      setLoading(false);
    }
  }


 

  useEffect(() => {
    checkUser();
    
  }, []);
  
    

  const value = {
    url,
    checkUser,user,loading,logOutUser,setLoading,
    initialLoader,setInitialLoader
  };

  return (
    <storeContext.Provider value={value}>{children}</storeContext.Provider>
  );
};
