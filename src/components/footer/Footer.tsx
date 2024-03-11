import {FC} from "react";
import styles from "./styles.module.css"

const Footer: FC = () => {
    let date = new Date();
    return(
        <footer className={styles.footer}>
            <img className={styles.logo} src="/marvel_logo.svg" alt="logo"/>
            <p>Data provided by Marvel. © {date.getFullYear()} MARVEL</p>
            <a href="https://developer.marvel.com/">developer.marvel.com</a>
        </footer>
    )
}

export default Footer;
