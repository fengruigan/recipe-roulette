import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const [countDown, setCountDown] = useState(3);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      countDown > 0 && setCountDown(countDown - 1);
    }, 1000);
    if (countDown === 0) {
      navigate("/");
    }
    return () => clearInterval(interval);
  }, [countDown]);

  return (
    <Container className="text-center mt-5">
      <h1>404 Not Found</h1>
      <div>Oops... The page you are looking for is not here.</div>
      <div>
        You will be redirected to the home page in {countDown} seconds. Or click <Link to="/">here</Link> to return to
        home page.
      </div>
    </Container>
  );
};

export default NotFoundPage;
