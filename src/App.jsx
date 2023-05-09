import React, { useContext, useEffect } from "react";
import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";

import AppNavbar from "./components/AppNavbar";

import { AuthContext } from "./contexts/AuthContext";
import { verifySessionAndRefresh } from "./functions/auth";
import "./App.css";
// import Notification from "./components/Notification";

const App = () => {
  const { user } = useContext(AuthContext);
  // const [toast, setToast] = useState(false);

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
        <Outlet />
      </Container>
    </div>
  );
};

export default App;
