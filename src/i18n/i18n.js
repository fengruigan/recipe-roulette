import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// for all options read: https://www.i18next.com/overview/configuration-options
i18n.use(initReactI18next).init({
  debug: true,
  fallbackLng: "EN",
  lng: "ZH",
  interpolation: {
    escapeValue: false,
  },
  resources: {
    EN: {
      translation: require("./locales/en.json"),
    },
    ZH: {
      translation: require("./locales/zh.json"),
    },
  },
});

export default i18n;
