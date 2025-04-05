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
          element: <CreateBlog />,
        },
        {
          path: "/blog/:id",
          element: <SingleBlog />,
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
          element: <BlogCard />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
