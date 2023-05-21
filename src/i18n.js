import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    debug: true,
    fallbackLng: "EN",
    lng: "ZH",
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    resources: {
      EN: {
        translation: {
          navbar: {
            home: "Home",
            language: "Language",
            signIn: "Sign In/Up",
            account: "My Account",
            message: "Logged in as",
            inventory: "Inventory",
            plans: "Plans",
            logout: "Logout",
          },
        },
      },
      ZH: {
        translation: {
          navbar: {
            home: "首页",
            language: "语言",
            signIn: "登录/注册",
            account: "我的账号",
            message: "登录账号",
            inventory: "我的库存",
            plans: "我的计划",
            logout: "登出",
          },
        },
      },
    },
  });

export default i18n;
