import React from "react";
import withAuth from "../components/Auth/withAuth";

const AccountPage = () => {
  document.title = "Recipe Roulette | My Account";
  return <h1>Account Page</h1>;
};

const WithAuthWrappedAccountPage = () => {
  return withAuth(AccountPage);
};

export default WithAuthWrappedAccountPage;
