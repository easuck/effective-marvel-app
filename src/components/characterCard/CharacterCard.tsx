import {FC} from "react";
import styles from "./styles.module.css"
import {Link} from "react-router-dom";

const CharacterCard: FC<{id: number, image: string, name: string, desc: string, openCharacterInfo: (id: number) => void}> =
    ({id, image, name, desc, openCharacterInfo}) => {
    return(
        <div className={styles.card}>
            <Link className={styles.link} to={"/characters/" + id}>
                <img src={image} alt="portrait" onClick={() => openCharacterInfo}/>
            </Link>
            <div className={styles.textWrapper}>
                <h3 className={styles.name}>{name}</h3>
                <p className={styles.desc}>{desc}</p>
            </div>
        </div>
    )
}

export default CharacterCard;