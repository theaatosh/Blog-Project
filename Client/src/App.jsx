import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./Layout/MainLayout";
import AboutsUs from "./pages/AboutUsPage/AboutUs";
import ContactUs from "./pages/ContactUsPage/ContactUs";
import { Home } from "./pages/HomePage/Home";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      // element: <MainLayout />,

      children:[
        {index:true,
          element:<Home/>
        },
        { path: "/aboutUs", element: <AboutsUs/> },
        {
          path: "/contactUs",
          element: <ContactUs />,
        },
      ]
    },
    
  ]);

  return <RouterProvider router={router} />;
};

export default App;
