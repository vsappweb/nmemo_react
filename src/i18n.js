import i18n from "i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

i18n
  // Configure language and load Backend
  .use(Backend)
  // Add Language Detector
  .use(LanguageDetector)
  // Initialise ReactI18next
  .use(initReactI18next)
  .init({
    // Custom language
    fallbackLng: "en",
    debug: true,
    // Configure language detection order and cache
    detection: {
      order: ["queryString", "cookie"],
      cache: ["cookie"],
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
