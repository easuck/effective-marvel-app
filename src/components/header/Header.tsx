import React, {FC, useEffect, useState} from 'react';
import styles from "./styles.module.css"
import {Link} from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import {IconContext} from "react-icons";

const Header: FC = () => {
    const [matches, setMatches] =
        useState<boolean>(window.matchMedia("(min-width: 550px)").matches);
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

    useEffect(() => {
        window
            .matchMedia("(min-width: 550px)")
            .addEventListener("change", e => setMatches(e.matches));
    }, []);

    useEffect(() => {

    }, [isMenuOpen]);

    return (
        <>
            <header className={styles.header}>
                <img className={styles.logo} src="/marvel_logo.svg" alt="logo"/>
                {
                    matches ? (
                        <nav className={styles.nav}>
                            <Link to="characters">Characters</Link>
                            <Link to="comics">Comics</Link>
                            <Link to="favourites">Favourites</Link>
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