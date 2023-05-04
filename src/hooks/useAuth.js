import { useState } from "react";
import { CognitoUserPool, CognitoUser, AuthenticationDetails, CognitoUserSession } from "amazon-cognito-identity-js";

const useAuth = () => {
  const userPoolConfig = {
    UserPoolId: "us-west-2_jsPuJX2AC",
    ClientId: "3teb82sj2427e84rq62i36jt64",
  };
  const [userPool] = useState(() => new CognitoUserPool(userPoolConfig));
  const [user] = useState(() => userPool.getCurrentUser());

  const getUser = () => {
    return user;
  };

  const verifySession = (shouldRefresh) => {
    return new Promise((resolve, reject) => {
      getUser().getSession((err, session) => {
        if (err) {
          reject(err);
          return;
        }
        const cognitoSession = new CognitoUserSession({
          IdToken: session.idToken,
          AccessToken: session.accessToken,
          RefreshToken: session.refreshToken,
        });
        if (cognitoSession.isValid()) {
          resolve(true);
          return;
        }
        if (!cognitoSession.isValid() && shouldRefresh) {
          getUser().refreshSession(cognitoSession.getRefreshToken(), (err) => {
            if (err) {
              reject(err);
              return;
            }
            resolve(true);
            return;
          });
        } else if (!cognitoSession.isValid()) {
          resolve(false);
          return;
        }
      });
    });
  };

  const authenticateUser = (email, password) => {
    return new Promise((resolve, reject) => {
      const userData = {
        Username: email,
        Pool: userPool,
      };
      const details = new AuthenticationDetails({
        Username: email,
        Password: password,
      });
      const user = getUser() || new CognitoUser(userData);
      user.authenticateUser(details, {
        onSuccess: () => {
          resolve(true);
          return;
        },
        onFailure: (err) => {
          reject(err);
          return;
        },
      });
    });
  };

  const getAuthedUserAttributes = () => {
    return new Promise((resolve, reject) => {
      getUser().getUserAttributes((err, result) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(result);
        return;
      });
    });
  };

  const redirectToSignIn = () => {
    window.location.href = "/signin";
  };

  return { userPool, getUser, redirectToSignIn, getAuthedUserAttributes, authenticateUser, verifySession };
};

export default useAuth;
