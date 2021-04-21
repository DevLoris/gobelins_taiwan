import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translationFR from '../public/lang/fr.json';

const LANGUAGE = {
    FR: "fr"
};

let defaultLanguage = LANGUAGE.FR;

// the translations
const resources = {
    fr: {
        translation: translationFR
    }
};

i18n
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
        resources,
        lng: defaultLanguage,

        keySeparator: ".",  // to support nested translations

        interpolation: {
            escapeValue: false // react already safes from xss
        }
    });

export default i18n;