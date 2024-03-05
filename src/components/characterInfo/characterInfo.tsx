import {FC} from "react";
import styles from "./styles.module.css"
import {Link, useParams} from "react-router-dom";
import {characters} from "../../data/charactersData.tsx";
import {comics} from "../../data/comicsData.tsx"

const CharacterInfo: FC = () => {
    let {id} = useParams<"id">();
    return(
        <section className={styles.characterInfo}>
            <img className={styles.portrait} src={characters[id].image} alt="portrait"/>
            <div className={styles.info}>
                <div className={styles.descriptionWrapper}>
                    <h3>{characters[id].name}</h3>
                    <h4>{characters[id].desc}</h4>
                </div>
                <div className={styles.comicsList}>
                    <h3>Comics</h3>
                    {characters[id].comics.map(comicsIndex => {
                        return <Link className="link" to={"/comics/" + comicsIndex}>
                            <h4>{comics[comicsIndex].name}</h4>
                        </Link>
                    })}
                </div>
            </div>
        </section>
    )
}

export default CharacterInfo;
