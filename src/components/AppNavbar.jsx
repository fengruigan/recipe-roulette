import React, { useState, useEffect, useContext } from "react";
import Container from "react-bootstrap/Container";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays, faCircleUser, faJarWheat, faUser, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavDropdown } from "react-bootstrap";
import { AuthContext } from "../contexts/AuthContext";
import { getAuthedUserEmail, logout } from "../functions/auth";

const AppNavbar = () => {
  const [displayEmail, setDisplayEmail] = useState(null);
  const { user, setUser, isAuthed } = useContext(AuthContext);

  useEffect(() => {
    const displayEmail = async () => {
      if (user && isAuthed) {
        const email = await getAuthedUserEmail(user);
        setDisplayEmail(email);
      } else {
        setDisplayEmail(null);
      }
    };

    displayEmail();
  }, [user, isAuthed, getAuthedUserEmail]);

  const NavDropdownTitle = (
    <>
      <FontAwesomeIcon icon={faCircleUser} className="me-1" />
      My Account
    </>
  );

  const loggedInNav = (
    <NavDropdown title={NavDropdownTitle} id="basic-nav-dropdown" align="end">
      <NavDropdown.ItemText>
        <div>Logged in as</div>
        <div>{displayEmail}</div>
      </NavDropdown.ItemText>
      <NavDropdown.Divider />
      <NavDropdown.Item href="/account">
        <FontAwesomeIcon icon={faUser} className="me-1" />
        Account
      </NavDropdown.Item>
      <NavDropdown.Item href="#action/3.2">
        <FontAwesomeIcon icon={faJarWheat} className="me-1" />
        Pantry
      </NavDropdown.Item>
      <NavDropdown.Item href="#action/3.3">
        <FontAwesomeIcon icon={faCalendarDays} className="me-1" />
        Plans
      </NavDropdown.Item>
      <NavDropdown.Divider />
      <NavDropdown.Item
        onClickCapture={() => {
          logout(user);
          setUser(null);
        }}
      >
        Logout
      </NavDropdown.Item>
    </NavDropdown>
  );

  return (
    <Navbar className="AppNavbar" bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/">Recipe Roulette</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto me-0">
            <Nav.Link href="/">Home</Nav.Link>
            {displayEmail ? (
              loggedInNav
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
