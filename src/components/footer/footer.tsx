import {FC} from "react";
import styles from "./styles.module.css"

const Footer: FC = () => {
    return(
        <footer className={styles.footer}>
            <img className={styles.logo} src="../../../public/marvel_logo.svg"/>
            <h3>Data provided by Marvel. © 2022 MARVEL</h3>
            <h3>developer.marvel.com</h3>
        </footer>
    )
}

export default Footer;
