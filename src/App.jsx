import React from "react";
import AppNavbar from "./components/AppNavbar";
import RecipePage from "./pages/RecipePage";
import "./App.css";

const App = () => {
  return (
    <div className="App">
      <AppNavbar />
      <RecipePage />
    </div>
  );
};

export default App;
