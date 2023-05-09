import React from "react";
import ReactDOM from "react-dom/client";
import AuthContextProvider from "./contexts/AuthContext";
import { createHashRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import AccountPage from "./pages/AccountPage";
import AuthPage from "./pages/AuthPage";
import LandingPage from "./pages/LandingPage";
import RecipePage from "./pages/RecipePage";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

const router = createHashRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <div>404 Page not found</div>,
    children: [
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

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
