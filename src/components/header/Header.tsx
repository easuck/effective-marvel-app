import {ChangeEventHandler, FC, useEffect, useState} from 'react';
import styles from "./styles.module.css"
import {Link} from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import {IconContext} from "react-icons";
import {useTranslation} from "react-i18next";
import i18n from "i18next";
import {localesKeys} from "../../localization";

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


    return (
        <>
            <header className={styles.header}>
                <img className={styles.logo} src="/marvel_logo.svg" alt="logo"/>
                {
                    highResolution ? (
                        <nav className={styles.nav}>
                            <select onChange={(e) => handleLanguageChange(e)} value={i18n.language}>
                                {localesKeys.map(item => (
                                    <option key={item} value={item}>
                                        {item}
                                    </option>
                                ))}
                            </select>
                            <Link to="characters">{t("Characters")}</Link>
                            <Link to="comics">{t("Comics")}</Link>
                            <Link to="favourites">{t("Favourites")}</Link>
                        </nav>
                    ) : (
                        <IconContext.Provider value={{size: "40px", color: "orange"}}>
                            <GiHamburgerMenu onClick={() => setIsMenuOpen(!isMenuOpen)}/>
                        </IconContext.Provider>
                    )
                }
                {
                    isMenuOpen &&
                    <nav className={styles.nav}>
                        <Link to="characters">Characters</Link>
                        <Link to="comics">Comics</Link>
                        <Link to="favourites">Favourites</Link>
                    </nav>
                }
            </header>
        </>
    );
};

export default Header;