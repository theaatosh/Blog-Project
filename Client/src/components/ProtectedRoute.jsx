import React, { Children, useContext } from 'react'
import { storeContext } from '../context/StoreContext';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({children}) => {
    const {user,loading}=useContext(storeContext);
    

    if(loading){
        return <div>Loading...</div>
    }
    console.log(loading);
        
  return user? children:<Navigate to='/login' replace/>
}

export default ProtectedRoute