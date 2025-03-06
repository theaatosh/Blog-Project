import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./Layout/MainLayout";
import AboutsUs from "./pages/AboutUsPage/AboutUs";
import ContactUs from "./pages/ContactUsPage/ContactUs";
import { Home } from "./pages/HomePage/Home";
import CreateBlog from "./pages/CreateBlog/CreateBlog";
import SingleBlog from "./pages/SingleBlog/SingleBlog";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,

      children:[
        {index:true,
          element:<Home/>
        },
        { path: "/aboutus", element: <AboutsUs/> },
        {
          path: "/contactus",
          element: <ContactUs />,
        },
        {
          path:"/create-blog",
          element:<CreateBlog/>
        },
        {
          path:"/blog/:id",
          element:<SingleBlog/>
        }
      ]
    },
    
  ]);

  return <RouterProvider router={router} />;
};

export default App;
