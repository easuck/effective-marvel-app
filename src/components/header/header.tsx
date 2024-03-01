import React, {FC} from 'react';
import styles from "./styles.module.css"

const Header: FC = () => {
    return (
        <header className={styles.header}>
            <img className={styles.logo} src="../../../public/marvel_logo.svg" alt="logo"/>
            <nav className={styles.nav}>
                <li>Characters</li>
                <li>Comics</li>
            </nav>
        </header>
    );
};

export default Header;