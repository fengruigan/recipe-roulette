import React, { useContext, useEffect } from "react";
import AppNavbar from "./components/AppNavbar";
import RecipePage from "./pages/RecipePage";
import LandingPage from "./pages/LandingPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";

// import useAuth from "./hooks/useAuth";
import { AuthContext } from "./contexts/AuthContext";
import AccountPage from "./pages/AccountPage";
import { verifySessionAndRefresh } from "./functions/auth";
import { Container } from "react-bootstrap";
import AuthPage from "./pages/AuthPage";

const App = () => {
  const { user } = useContext(AuthContext);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <LandingPage />,
    },
    {
      path: "/account",
      element: <AccountPage />,
    },
    {
      path: "/recipes",
      element: <RecipePage />,
    },
    {
      path: "/auth",
      element: <AuthPage />,
    },
    // {
    //   path: "/signin",
    //   element: <SignInPage />,
    // },
    // {
    //   path: "/signup",
    //   element: <SignUpPage />,
    // },
    // {
    //   path: "/confirm",
    //   element: <ConfirmRegistrationPage />,
    // },
  ]);

  useEffect(() => {
    if (user) verifySessionAndRefresh(user);
  }, []);

  return (
    <div className="App">
      <AppNavbar />
      <Container>
        <RouterProvider router={router} />
      </Container>
    </div>
  );
};

export default App;
