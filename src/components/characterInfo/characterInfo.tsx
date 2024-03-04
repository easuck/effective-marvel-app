import {FC} from "react";
import styles from "./styles.module.css"
import {useParams} from "react-router-dom";
import {characters} from "../../data/CharactersData.tsx";
/*const CharacterInfo: FC<{image: string, name: string, description: string, comics: string[]}> =
    ({image, name, description, comics}) => {*/
const CharacterInfo: FC = () => {
    let {id} = useParams<"id">();
    return(
        <section className={styles.characterInfo}>
            <img className={styles.portrait} src={characters[id].image} alt="portrait"/>
            <div className={styles.info}>
                <div className={styles.description}>
                    <div>{characters[id].name}</div>
                    <div>{characters[id].desc}</div>
                </div>
                <div className={styles.comicsList}>
                    <p>Comics</p>
                    {characters[id].comics.map((comics) => (
                        <p>{comics}</p>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default CharacterInfo;
