import { Outlet } from "react-router-dom"
import Footer from '../components/Footer/Footer'
import Navbar from '../components/Navbar/Navbar'
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css";


const MainLayout = () => {
  return (
    <>
    <div className="w-[100%] ">
    <Navbar/>
    <ToastContainer position="top-right" autoClose={3000} />
    <Outlet/>
    <Footer/>
    </div>
    
    </>

  )
}

export default MainLayout