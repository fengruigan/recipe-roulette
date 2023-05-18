import React from "react";
import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";

import AppNavbar from "./components/AppNavbar";

import "./App.css";

const App = () => {
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
