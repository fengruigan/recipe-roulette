import React, { useContext, useEffect } from "react";
import { Container } from "react-bootstrap";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import AccountPage from "./pages/AccountPage";
import AppNavbar from "./components/AppNavbar";
import AuthPage from "./pages/AuthPage";
import LandingPage from "./pages/LandingPage";
import RecipePage from "./pages/RecipePage";

import { AuthContext } from "./contexts/AuthContext";
import { verifySessionAndRefresh } from "./functions/auth";
import "./App.css";
// import Notification from "./components/Notification";

const App = () => {
  const { user } = useContext(AuthContext);
  // const [toast, setToast] = useState(false);

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
  ]);

  useEffect(() => {
    if (user) verifySessionAndRefresh(user);
  }, []);

  // useEffect(() => {
  //   setToast(true);
  // }, [isAuthed, setToast]);

  return (
    <div className="App">
      {/* {toast && isAuthed && (
        <Notification
          type="success"
          title="Welcome"
          body="Welcome to Recipe Roulette! Happy cooking!"
          onClose={() => setToast(false)}
          position="bottom-end"
          duration={3000}
        />
      )}
      {toast && !isAuthed && (
        <Notification
          type="primary"
          title="Logged out"
          body="Hope to see you again soon."
          onClose={() => setToast(false)}
          position="bottom-end"
          duration={3000}
        />
      )} */}
      <AppNavbar />
      <Container>
        <RouterProvider router={router} />
      </Container>
    </div>
  );
};

export default App;
