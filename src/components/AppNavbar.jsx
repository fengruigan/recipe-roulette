import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import useAuth from "../hooks/useAuth";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

const AppNavbar = () => {
  const { getAuthedUserAttributes, verifySession } = useAuth();
  const [displayEmail, setDisplayEmail] = useState("");
  const [isSessionValid, setIsSessionValid] = useState(false);

  useEffect(() => {
    const getUserEmail = async () => {
      const valid = await verifySession(true);
      setIsSessionValid(valid);
      if (valid) {
        const attirbutes = await getAuthedUserAttributes();
        const email = attirbutes.filter((el) => el.Name === "email").map((el) => el.Value)[0];
        setDisplayEmail(email);
      }
    };
    getUserEmail();
  }, [verifySession, getAuthedUserAttributes]);

  return (
    <Navbar className="AppNavbar" bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/">Recipe Roulette</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto me-0">
            <Nav.Link href="/">Home</Nav.Link>
            {isSessionValid ? (
              <Nav.Link href="/account">
                <FontAwesomeIcon icon={faUser} className="me-1" />
                Logged in as {displayEmail}
              </Nav.Link>
            ) : (
              <Nav.Link href="/signin">
                <FontAwesomeIcon icon={faUserPlus} className="me-1" />
                Sign in/up
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;
