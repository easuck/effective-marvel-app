import {ChangeEvent, ChangeEventHandler, FC, useEffect, useState} from 'react';
import styles from "./styles.module.css"
import {Link} from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import {IconContext} from "react-icons";
import {useTranslation} from "react-i18next";
import i18n from "i18next";
import {localesKeys} from "../../localization";
import {themes, themeStore} from "../../stores/ThemeStore.ts";
import Selector from "../selector/Selector.tsx";

const Header: FC = () => {
    const [highResolution, setHighResolution] =
        useState<boolean>(window.matchMedia("(min-width: 550px)").matches);
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
    const {t} = useTranslation();

    useEffect(() => {
        window
            .matchMedia("(min-width: 550px)")
            .addEventListener("change", e => {
                setHighResolution(e.matches);
                setIsMenuOpen(false);
            })
    }, []);

    const handleLanguageChange: ChangeEventHandler<HTMLSelectElement> = (e) => {
        i18n.changeLanguage(e.target.value);
        localStorage.setItem("LOCALE", e.target.value);
    }

    const handleThemeChange: ChangeEventHandler<HTMLSelectElement> = (e) => {
        themeStore.changeActiveTheme(e.target.value);
    }


    return (
        <>
            <header className={styles.header}>
                <img className={styles.logo} src="/marvel_logo.svg" alt="logo"/>
                {
                    highResolution ? (
                        <nav className={styles.nav}>
                            <Selector options={themes} callback={handleThemeChange} defaultTheme={localStorage.getItem("ACTIVE_THEME")}/>
                            <Selector options={localesKeys} callback={handleLanguageChange} defaultLng={i18n.language}/>
                            <Link to="characters">{t("Characters")}</Link>
                            <Link to="comics">{t("Comics")}</Link>
                            <Link to="favourites">{t("Favourites")}</Link>
                        </nav>
                    ) : (
                        <div className={styles.navWrapper}>
                            <Selector options={themes} callback={handleThemeChange} defaultTheme={localStorage.getItem("ACTIVE_THEME")}/>
                            <Selector options={localesKeys} callback={handleLanguageChange} defaultLng={i18n.language}/>
                            <IconContext.Provider value={{size: "40px", color: "orange"}}>
                                <GiHamburgerMenu onClick={() => setIsMenuOpen(!isMenuOpen)}/>
                            </IconContext.Provider>
                        </div>

                    )
                }
                {
                    isMenuOpen &&
                    <nav className={styles.nav}>
                        <Link to="characters">{t("Characters")}</Link>
                        <Link to="comics">{t("Comics")}</Link>
                        <Link to="favourites">{t("Favourites")}</Link>
                    </nav>
                }
            </header>
        </>
    );
};

export default Header;