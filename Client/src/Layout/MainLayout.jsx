import { Outlet } from "react-router-dom"
import Footer from '../components/Footer/Footer'
import Navbar from '../components/Navbar/Navbar'
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css";
import { useContext, useEffect } from "react";
import { storeContext } from "../context/StoreContext";
import Loading from "../components/Loading";
import MainLoader from "../components/MainLoader/MainLoader";
import Logo from '/bslogo.png'


const MainLayout = () => {
  const {initialLoader,setInitialLoader}=useContext(storeContext);


  const fetchInitialData=()=>{

    setTimeout(()=>{
      setInitialLoader(false);
    },2000)
  }
  useEffect(()=>{
    fetchInitialData();
  },[]);
  return (
    <>
  {initialLoader?<MainLoader logoUrl={Logo} altText={"BlogSpot"}  fullscreen={true}/>:
  <div className="w-[100%] ">
  <Navbar/>
  <ToastContainer position="top-right" autoClose={3000} />
  <Outlet/>
  <Footer/>
  </div>}
    
    
    </>

  )
}

export default MainLayout