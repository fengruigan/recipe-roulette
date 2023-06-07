import React from "react";
import { Button, Container, Row, Col } from "react-bootstrap";
import { useState } from "react";
import TestingData from "../TestingData.json";
import "../InventoryPage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from "react-i18next";

// const InventoryColumns = () => {
//   {/* Function to store current inventory */}
//   const columns = [
//     // #Q# How to get categoryZH and nameZH instead if the user chose ZH (use conditional)
//     // #Q# Spacing between Category and Item - length limit on category?
//     { label: "Category", accessor: "category"},
//     { label: "Item", accessor: "name"},
//   ];
//   return columns;
// }

function InventoryHeadings({ columns }) {
  return (
    <thead>
      <tr>
        {columns.map(({ label, accessor }) => {
          return <th key={accessor}>{label}</th>;
        })}
      </tr>
    </thead>
  );
}

function InventoryBody({ tableData, columns }) {
  // #Q# If inventory contains X that is out of master data, what do we do?
  // #Q# Are we expecting any special characters, digits, or null?
  return (
    <tbody>
      {tableData.map((data) => {
        return (
          <tr key={data.id}>
            {columns.map(({ accessor }) => {
              const tData = data[accessor] ? data[accessor] : "N/A";
              return <td key={accessor}>{tData}</td>;
            })}
          </tr>
        );
      })}
    </tbody>
  );
}

// const filteredTesting = (tableData) => {
//   const filteredData = tableData.filter(obj => obj.category${language} === "Meat");
//   console.log(filteredData);
//   return filteredData;
// }

const InventoryPage = () => {
  /*const inventoryItems = currentInventory();*/
  const [tableData, setTableData] = useState(TestingData);
  // const columns = InventoryColumns();
  const submitItems = () => {
    const newItem = { category: "Category", name: "Item" };
    setTableData([...tableData, newItem]);
  };
  const [ButtonsClicked, setButtonsClicked] = useState([]);
  const [language, setLanguage] = useState("EN");
  const { i18n } = useTranslation();

  const columns = [
    // #Q# How to get categoryZH and nameZH instead if the user chose ZH
    // String interpolation (== template string) shorter than if-else
    { label: "Category", accessor: `category${language}` },
    { label: "Item", accessor: `name${language}` },
    //language === "EN" ? "nameEN" : "nameZH"
  ];
  const MeatFiltered = tableData.filter(
    (obj) => obj[`category${language}`] === "Meat" || obj[`category${language}`] === "肉类"
  );

  const NutsFiltered = tableData.filter(
    (obj) => obj[`category${language}`] === "Nuts" || obj[`category${language}`] === "干果"
  );
  const MeatHeading = language === "EN" ? "Meat" : "肉类";
  const NutsHeading = language === "EN" ? "Nuts" : "干果";

  const Clicked = (value) => {
    if (ButtonsClicked.includes(value)) {
      return ButtonsClicked;
    } else {
      setButtonsClicked((prevButtonsClicked) => [...prevButtonsClicked, value]);
      return ButtonsClicked;
    }
  };

  const renderButtonsClicked = () => {
    const renderedButtons = [];
    for (let i = 0; i < ButtonsClicked.length; i++) {
      renderedButtons.push(<h5 key={i}>{ButtonsClicked[i]}</h5>);
    }
    return renderedButtons;
  };
  // Push to Github
  // Clicked --> Button turn to Blue;
  // Submit --> Submit the List
  return (
    <Container fluid>
      <Row>
        <Col>
          <h1>Inventory Page</h1>
          <h3>Current contents</h3>
          <caption style={{ display: "block", whiteSpace: "nowrap" }}>
            Check what magical surprises your fridge holds and let your culinary adventures begin!
          </caption>
          <h5>
            <FontAwesomeIcon icon="fa-light fa-meat" />
            {MeatHeading}
          </h5>
          <>
            {MeatFiltered.map((item, index) => (
              <Button key={index} variant="outline-dark" onClick={() => Clicked(item[`name${language}`])}>
                {item[`name${language}`]}
                {console.log(i18n.language)}
              </Button>
            ))}
          </>
          {/* <table className = "table">
            <InventoryHeadings columns={columns} />
            <InventoryBody columns={columns} tableData={filtered} />
          </table> */}

          <br></br>
          <br></br>

          <h5>{NutsHeading}</h5>
          <>
            {NutsFiltered.map((item, index) => (
              <Button key={index} variant="outline-dark" onClick={() => Clicked(item[`name${language}`])}>
                {item[`name${language}`]}
              </Button>
            ))}
          </>

          <br></br>
          <br></br>

          <h5>Your Inventory</h5>
          {ButtonsClicked.map((ButtonsClicked, index) => (
            <b>{ButtonsClicked}, </b>
          ))}
          <br />
          <br />
          <br></br>
          <Button onClick={submitItems}>Submit</Button>
          <Button
            onClick={() => {
              language === "ZH" ? setLanguage("EN") : setLanguage("ZH");
            }}
          >
            Change Language
          </Button>
          <br></br>
        </Col>
      </Row>
    </Container>
  );
};

/* Design:
> Current Contents to display a table with current Inventory with the following headings Category, Item (Language Question raised above)
> Buttons: Add Item, Remove Item
> Add Item: Click the button to show a drop down list of defined Categories, then you can choose the Item within that Category -- preventing to add Meat - Choy Sum mismatch)
Maybe timestamp of the line creation?
popup a modal and get possible ingredients BY category (e.g. fetching objectID), submit -->  
> Remove Item: Hmmm UX wise better to select the line to delete?
*/

export default InventoryPage;
