import {FC} from "react";
import styles from "./styles.module.css"
import {Link} from "react-router-dom";

const Card: FC<{id: number, image: string, name: string, desc: string, link: string}> =
    ({id, image, name, desc, link}) => {
    return(
        <div className={styles.card}>
            <Link className={styles.link} to={`/${link}/` + id}>
                <img src={image} alt="portrait"/>
            </Link>
            <div className={styles.textWrapper}>
                <h3 className={styles.name}>{name}</h3>
                <p className={styles.desc}>{desc == "" ? "No description" : desc}</p>
            </div>
        </div>
    )
}

export default Card;