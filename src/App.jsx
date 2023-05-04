import React from "react";
import AppNavbar from "./components/AppNavbar";
import RecipePage from "./pages/RecipePage";
import LandingPage from "./pages/LandingPage";
import AuthPage from "./pages/AuthPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/recipes",
    element: <RecipePage />,
  },
  {
    path: "/signin",
    element: <AuthPage signIn={true} />,
  },
  {
    path: "/signup",
    element: <AuthPage signIn={false} />,
  },
]);

const App = () => {
  return (
    <div className="App">
      <AppNavbar />
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
