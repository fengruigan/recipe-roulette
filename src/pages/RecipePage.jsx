/* eslint-disable indent */
import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import RecipeDisplay from "../components/RecipeDisplay";

const RecipePage = () => {
  const [recipes, setRecipes] = useState([]);

  const onFetch = async () => {
    const body = JSON.stringify({ keyword: "egg" });
    const res = await fetch("https://j635an2edqmaoyggrqy4sritge0qlsqf.lambda-url.us-east-2.on.aws/", {
      method: "POST", // "GET", "POST", "PUT", "DETELE"
      body: body,
    });
    const data = await res.json(); // recipe array
    console.log(data);
    setRecipes([...data["recipes"]]);
  };

  return (
    <div style={{ padding: "2em" }}>
      <h1>Recipe Planning</h1>
      <div>
        <InputGroup className="mb-3" style={{ width: "50%", margin: "0 auto" }}>
          <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
          <Form.Control placeholder="Username" aria-label="Username" aria-describedby="basic-addon1" />
        </InputGroup>
      </div>

      <Button onClick={onFetch}>Fetch</Button>

      {recipes
        ? recipes.map((recipe, idx) => {
            return <RecipeDisplay key={idx} recipe={recipe} />;
          })
        : null}
    </div>
  );
};

export default RecipePage;
