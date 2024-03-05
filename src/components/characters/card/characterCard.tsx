import {FC} from "react";
import styles from "./styles.module.css"
import {Link} from "react-router-dom";

const CharacterCard: FC<{id: number, image: string, name: string, desc: string}> =
    ({id, image, name, desc}) => {
    return(
        <div className={styles.card}>
            <Link className={styles.link} to={"/characters/" + id}>
                <img src={image} alt="portrait"/>
            </Link>
            <div className={styles.textWrapper}>
                <h3 className={styles.name}>{name}</h3>
                <p className={styles.desc}>{desc}</p>
            </div>
        </div>
    )
}

export default CharacterCard;