import i18n from "i18next";
import {initReactI18next} from "react-i18next";
import {locales} from "./locales.ts";

export const localesKeys = Object.keys(locales);
export const DEFAULT_LANGUAGE = localesKeys[0];
const language = localesKeys.find(key => key == localStorage.getItem("LOCALE")) ?? DEFAULT_LANGUAGE

i18n.use(initReactI18next).init({
    resources: locales,
    lng: language,
    fallbackLng: DEFAULT_LANGUAGE,
    ns: "translation",
    defaultNS: "translation",
    keySeparator: ".",
    interpolation: {escapeValue: false}
})

export default i18n;