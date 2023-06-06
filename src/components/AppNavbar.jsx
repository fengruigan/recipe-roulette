import React, { useState, useEffect, useContext } from "react";
import Container from "react-bootstrap/Container";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarDays,
  faCircleUser,
  faHouse,
  faJarWheat,
  faLanguage,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavDropdown } from "react-bootstrap";
import { AuthContext } from "../contexts/AuthContext";
import { getAuthedUserEmail, logout } from "../functions/auth";
import { Link, useNavigate } from "react-router-dom";

import { useTranslation } from "react-i18next";
import fetchWrap from "../functions/fetchWrap";

const AppNavbar = () => {
  const [displayEmail, setDisplayEmail] = useState(null);
  const [changingLanguage, setChangingLanguage] = useState(false);
  const { user, setUser, isAuthed } = useContext(AuthContext);
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const displayEmail = async () => {
      if (isAuthed) {
        const email = await getAuthedUserEmail(user);
        setDisplayEmail(email);
      } else {
        setDisplayEmail(null);
      }
    };
    displayEmail();
  }, [user, isAuthed, getAuthedUserEmail]);

  const handleChangeLanguage = async (language) => {
    if (!isAuthed) {
      i18n.changeLanguage(language);
      return;
    } else {
      setChangingLanguage(true);
      const response = await fetchWrap("/user/settings", {
        method: "POST",
        body: {
          userId: user.username,
          language,
        },
      });
      if (response.ok) {
        i18n.changeLanguage(language);
      } else {
        alert("Failed to connect to server");
      }
      setChangingLanguage(false);
    }
  };

  const languageDropdown = (
    <NavDropdown
      title={
        <>
          <FontAwesomeIcon icon={faLanguage} className="me-1" />
          {t("navbar.language")}
        </>
      }
      align="end"
    >
      <NavDropdown.Item disabled={changingLanguage} onClick={() => handleChangeLanguage("ZH")}>
        简体中文
      </NavDropdown.Item>
      <NavDropdown.Item disabled={changingLanguage} onClick={() => handleChangeLanguage("EN")}>
        English
      </NavDropdown.Item>
    </NavDropdown>
  );

  const loggedInNav = (
    <NavDropdown
      title={
        <>
          <FontAwesomeIcon icon={faCircleUser} className="me-1" />
          {t("navbar.account")}
        </>
      }
      align="end"
    >
      <NavDropdown.ItemText>
        {t("navbar.message")}
        <div>{displayEmail}</div>
      </NavDropdown.ItemText>
      <NavDropdown.Divider />
      <NavDropdown.Item as={Link} to="/inventory">
        <FontAwesomeIcon icon={faJarWheat} className="me-1" />
        {t("navbar.inventory")}
      </NavDropdown.Item>
      <NavDropdown.Item as={Link} to="/plans">
        <FontAwesomeIcon icon={faCalendarDays} className="me-1" />
        {t("navbar.plans")}
      </NavDropdown.Item>
      <NavDropdown.Divider />
      <NavDropdown.Item
        onClickCapture={async () => {
          logout(user);
          await setUser(null);
          navigate("/");
        }}
      >
        {t("navbar.logout")}
      </NavDropdown.Item>
    </NavDropdown>
  );

  return (
    <Navbar className="AppNavbar" bg="light" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">
          Recipe Roulette
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto me-0">
            <Nav.Link as={Link} to="/">
              <FontAwesomeIcon icon={faHouse} /> {t("navbar.home")}
            </Nav.Link>
            {languageDropdown}
            {displayEmail ? (
              loggedInNav
            ) : (
              <Nav.Link as={Link} to="/auth">
                <FontAwesomeIcon icon={faUserPlus} className="me-1" />
                {t("navbar.signIn")}
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;
