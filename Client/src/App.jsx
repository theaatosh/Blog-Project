import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./Layout/MainLayout";
import AboutsUs from "./pages/AboutUsPage/AboutUs";
import ContactUs from "./pages/ContactUsPage/ContactUs";
import { Home } from "./pages/HomePage/Home";
import CreateBlog from "./pages/CreateBlog/CreateBlog";
import SingleBlog from "./pages/SingleBlog/SingleBlog";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import Sidebar from "../src/Admin/components/Sidebar";
import UserDetails from "./Admin/Pages/UserDetails";
import AdminLayout from "./Admin/Layout/AdminLayout";
import { BlogCard } from "./components/BlogCard/BlogCard";
import HomePage from "./Admin/Pages/HomePage";
import { OtpVerify } from "./pages/OtpVerify/OtpVerify";
import Blogs from "./pages/Blogs/Blogs";
import ProtectedRoute from "./components/ProtectedRoute";
import BlogReviewCard from "./Admin/components/BlogReviewCard";
import AdminBlogs from "./Admin/Pages/AdminBlogs";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,

      children: [
        { index: true, element: <Home /> },
        { path: "/aboutus", element: <AboutsUs /> },
        {
          path: "/contactus",
          element: <ContactUs />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/signup",
          element: <Signup />,
        },
        {
          path: "/create-blog",
          element:<ProtectedRoute>
            <CreateBlog />
            </ProtectedRoute>
       
        },
        {
          path: "/blog/:id",
          element: <SingleBlog />,
        },
        {
          path: "/blogs",
          element: <Blogs />,
        },
        {
          path: "/otp-verify",
          element: <OtpVerify />,
        },
      ],
    },

    {
      path: "/admin",
      element: <AdminLayout />,
      children: [
        { index: true, element: <HomePage /> },
        {
          path: "userdetails",
          element: <UserDetails />,
        },
        {
          path: "adminblogs",
          element: <AdminBlogs />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
