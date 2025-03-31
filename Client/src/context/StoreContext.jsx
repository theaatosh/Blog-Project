import { createContext, useEffect, useState } from "react";
import axios from 'axios'

export const storeContext = createContext();

export const StoreContextProvider = ({ children }) => {
  const url = "http://localhost:5010";
  const [user,setUser]=useState(null);

  //function to check whether user is logged in
  const checkUser=async()=>{
    try{
      const res=await axios.get(`${url}/user/check-auth`,{withCredentials:true}); 
      if(res.data.isAuthenticated){
        setUser(res?.data?.username);
      }else{
        setUser(null);
      }
    }
    catch(err){
console.log(err?.response?.data?.message);
setUser(null);
    }
  }


  useEffect(() => {
    checkUser();
    
  }, []);
    
    

  const value = {
    url,
    checkUser
  };

  return (
    <storeContext.Provider value={value}>{children}</storeContext.Provider>
  );
};
