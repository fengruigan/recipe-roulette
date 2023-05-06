import React, { useContext, useEffect, useState } from "react";
import { Button, Form, Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

import { AuthContext } from "../contexts/AuthContext";
import { authenticateUser } from "../functions/auth";

const SignIn = () => {
  document.title = "Recipe Roulette | Sign-in";
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const { userPool, setUser, isAuthed, setIsAuthed } = useContext(AuthContext);

  useEffect(() => {
    if (isAuthed) {
      navigate("/");
    }
  }, [isAuthed]);

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const result = await authenticateUser(userPool, email, password);
      if (result.user) {
        await setUser(result.user);
      }
      if (result.success) {
        await setIsAuthed(true);
        navigate("/");
      } else {
        navigate("/confirm");
      }
    } catch (err) {
      switch (err.code) {
        case "UserNotFoundException":
          alert("User not found");
          break;
        case "NotAuthorizedException":
          alert("Incorrect password");
          break;
        default:
          alert("Unknown error");
          break;
      }
    }
  };

  return (
    <Container style={{ width: "50%", margin: "auto", marginTop: "5%" }}>
      <h1>Sign In</h1>
      <Form>
        <Form.Group className="mb-3" controlId="formEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
        </Form.Group>
        <Button variant="primary" onClick={handleSignIn}>
          Sign In
        </Button>
        <Form.Text className="ms-2" muted={false}>
          New User?
          <Link to="/signup" className="ms-1">
            Create an account here
          </Link>
        </Form.Text>
      </Form>
    </Container>
  );
};

export default SignIn;
