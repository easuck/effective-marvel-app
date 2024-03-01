import {FC} from "react";
import styles from "./styles.module.css"

const CharacterCard: FC<{image: string, name: string, desc: string}> =
    ({image, name, desc}) => {
    return(
        <div className={styles.card}>
            <img className={styles.portrait} src={image} alt="portrait"/>
            <div className={styles.textWrapper}>
                <h3 className={styles.name}>{name}</h3>
                <p className={styles.desc}>{desc}</p>
            </div>
        </div>
    )
}

export default CharacterCard;