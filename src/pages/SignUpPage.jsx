import React, { useContext, useState } from "react";
import { Button, Form, Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

import { signUpUser } from "../functions/auth";

const SignUp = () => {
  document.title = "Recipe Roulette | Sign-up";
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const { userPool, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    const result = await signUpUser(userPool, email, password);
    if (result) {
      await setUser(result.user);
      navigate("/confirm");
    } else alert("Something went wrong");
  };

  return (
    <Container style={{ width: "50%", margin: "auto", marginTop: "5%" }}>
      <h1>Sign Up</h1>
      <Form>
        <Form.Group className="mb-3" controlId="formEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            defaultValue={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Form.Text className="text-muted">We&rsquo;ll never share your email with anyone else.</Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            defaultValue={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" onClick={handleSignUp}>
          Sign Up
        </Button>
        <Form.Text className="ms-2" muted={false}>
          Already have an account? <Link to="/signin">Sign in</Link>
        </Form.Text>
      </Form>
    </Container>
  );
};

export default SignUp;
