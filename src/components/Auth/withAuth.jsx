import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

const withAuth = (WrappedComponent) => {
  const { isAuthed } = useContext(AuthContext);
  const [countDown, setCountDown] = useState(3);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      if (!isAuthed) {
        setTimeout(() => {
          navigate("/auth");
        }, 3000);
        setInterval(() => {
          countDown > 0 && setCountDown(countDown - 1);
        }, 1000);
      }
    };
    checkAuth();
  }, [isAuthed, countDown]);

  const unauthedMsg = (
    <div>
      <h1>Unauthorized</h1>
      Oops... You need to be signed in to view this page.
      <div>
        You will be redirected to the sign in page in {countDown} seconds. Or click <Link to="/auth">here</Link> to sign
        in
      </div>
    </div>
  );

  return isAuthed ? <WrappedComponent /> : unauthedMsg;
};

export default withAuth;
