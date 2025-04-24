import { useContext } from "react";
import { storeContext } from "../../context/StoreContext";
import { Navigate } from "react-router-dom";


export const AdminProtect=({children})=>{

    const {user,loading}=useContext(storeContext);

    if(loading){
        return <div>Loading...</div>
    }

   return user&&user.role==="admin"?children:<Navigate to='/'/>
    
}