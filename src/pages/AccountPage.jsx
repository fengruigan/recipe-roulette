import React from "react";
import withAuth from "../components/Auth/withAuth";
import { Button, ButtonGroup, Dropdown } from "react-bootstrap";

const AccountPage = () => {
  document.title = "Recipe Roulette | My Account";

  // sections
  // inventory
  const inventorySection = (
    <div className="mb-5">
      <h2>Inventory</h2>
      <hr />
      <div></div>
    </div>
  );
  // my recipes
  // meal plans
  const mealPlansSection = (
    <div className="mb-5">
      <h2>Meal Plans</h2>
      <hr />
    </div>
  );
  // settings
  const settingsSection = (
    <div className="mb-5">
      <h2>Settings</h2>
      <hr />
      <h3>Language</h3>
      <Dropdown as={ButtonGroup}>
        <Button variant="primary">English</Button>
        <Dropdown.Toggle split variant="primary" id="dropdown-split-basic" />
        <Dropdown.Menu>
          <Dropdown.Item href="#/action-1">Chinese - Simplified</Dropdown.Item>
          <Dropdown.Item href="#/action-2">English</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );

  return (
    <>
      <h1 className="mb-5">My Account</h1>
      {inventorySection}
      {mealPlansSection}
      {settingsSection}
    </>
  );
};

const WithAuthWrappedAccountPage = () => {
  return withAuth(AccountPage);
};

export default WithAuthWrappedAccountPage;
