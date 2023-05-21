import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

const withAuth = (WrappedComponent) => {
  const { isAuthed } = useContext(AuthContext);
  const [countDown, setCountDown] = useState(3);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      let interval = null;
      if (!isAuthed) {
        interval = setInterval(() => {
          countDown > 0 && setCountDown(countDown - 1);
        }, 1000);
        if (countDown === 0) {
          navigate("/");
        }
      }
      return () => clearInterval(interval);
    };
    checkAuth();
  }, [isAuthed, countDown]);

  const unauthedMsg = (
    <div className="text-center mt-5">
      <h1>Unauthorized</h1>
      <div>Oops... You need to be signed in to view this page.</div>
      <div>
        You will be redirected to the sign in page in {countDown} seconds. Or click <Link to="/auth">here</Link> to sign
        in
      </div>
    </div>
  );

  return isAuthed ? <WrappedComponent /> : unauthedMsg;
};

export default withAuth;
