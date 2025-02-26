import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Navbar from "./components/Navbar";
import MainLayout from "./Layout/MainLayout";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
    },
    { path: "/aboutUs", element: <AboutsUs /> },
    {
      path: "/contactUs",
      element: <ContactUs />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
