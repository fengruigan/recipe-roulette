import React from "react";
import { Button } from "react-bootstrap";

const InventoryPage = () => {
  return (
    <>
      <h1>Inventory Page</h1>
      <div>Current contents</div> {/* Display name and category (everything in english is fine) */}
      <Button>Add Item</Button> {/* Click the button to display a modal for users to choose ingredient */}
      {/* For modals, checkout https://react-bootstrap.netlify.app/docs/components/modal/ */}
      <Button>Remove Item</Button> {/* Click the button to display a modal for users to choose ingredient */}
    </>
  );
};

export default InventoryPage;
