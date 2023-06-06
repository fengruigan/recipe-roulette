import React, { useContext, useEffect } from "react";
import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";

import AppNavbar from "./components/AppNavbar";
import { AuthContext } from "./contexts/AuthContext";
import { useTranslation } from "react-i18next";
import "./App.css";
import fetchWrap from "./functions/fetchWrap";

const App = () => {
  const { user, isAuthed } = useContext(AuthContext);
  const { i18n } = useTranslation();

  useEffect(() => {
    const updateLanguage = async () => {
      if (user && isAuthed) {
        const getUserSettings = await fetchWrap(`/user/settings?userId=${user.username}`, {
          method: "GET",
        });
        if (getUserSettings.ok) {
          const userSettings = (await getUserSettings.json()).data;
          i18n.changeLanguage(userSettings.language);
        }
      }
    };
    updateLanguage();
  }, [user, isAuthed]);

  return (
    <div className="App">
      <AppNavbar />
      <Container>
        <Outlet />
      </Container>
    </div>
  );
};

export default App;
