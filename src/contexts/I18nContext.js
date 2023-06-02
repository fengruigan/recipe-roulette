import React, { useContext, useState } from "react";
import { AuthContext } from "./AuthContext";
import { PropTypes } from "prop-types";

export const I18nContext = React.createContext(null);

const I18nContextProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [locale, setLocale] = useState(() => {
    if (user) {
      //   console.log("get locale info from user");
    }
    return "ZH";
  });
  const values = {
    locale,
    setLocale,
  };
  return <I18nContext.Provider value={values}>{children}</I18nContext.Provider>;
};

export default I18nContextProvider;

I18nContextProvider.propTypes = {
  children: PropTypes.element,
};
