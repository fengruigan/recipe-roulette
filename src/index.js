import React from "react";
import ReactDOM from "react-dom/client";
import AuthContextProvider from "./contexts/AuthContext";
import { createHashRouter, RouterProvider } from "react-router-dom";
import App from "./App";
// import AccountPage from "./pages/AccountPage";
import NotFoundPage from "./pages/NotFoundPage";
import AuthPage from "./pages/AuthPage";
import LandingPage from "./pages/LandingPage";
import RecipePage from "./pages/RecipePage";
import "./index.css";
import "./i18n";

const root = ReactDOM.createRoot(document.getElementById("root"));

const router = createHashRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "/plans",
        element: <RecipePage />,
      },
      {
        path: "/auth",
        element: <AuthPage />,
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
]);

root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <RouterProvider router={router} />
    </AuthContextProvider>
  </React.StrictMode>
);
