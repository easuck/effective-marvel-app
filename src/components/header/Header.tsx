import React, {FC} from 'react';
import styles from "./styles.module.css"
import {Link, Outlet} from "react-router-dom";

const Header: FC = () => {
    return (
        <>
            <header className={styles.header}>
                <img className={styles.logo} src="/marvel_logo.svg" alt="logo"/>
                <nav className={styles.nav}>
                    <Link to="characters">Characters</Link>
                    <Link to="comics">Comics</Link>
                    <Link to="favourites">Favourites</Link>
                </nav>
            </header>
        </>
    );
};

export default Header;