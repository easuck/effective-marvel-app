import {FC} from "react";
import styles from "./styles.module.css"

const CharacterInfo: FC<{image: string, name: string, description: string, comics: string[]}> =
    ({image, name, description, comics}) => {
    return(
        <section className={styles.characterInfo}>
            <img className={styles.portrait} src={image} alt="portrait"/>
            <div className={styles.info}>
                <div className={styles.description}>
                    <div>{name}</div>
                    <div>{description}</div>
                </div>
                <div className={styles.comicsList}>
                    <p>Comics</p>
                    {comics.map((comics) => (
                        <p>{comics}</p>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default CharacterInfo;
