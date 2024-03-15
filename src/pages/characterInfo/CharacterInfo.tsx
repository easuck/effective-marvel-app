import {FC, useEffect, useState} from "react";
import styles from "./styles.module.css"
import {Link, useParams} from "react-router-dom";
import {ICharacter} from "../../types/ICharacter.tsx";
import charactersRequests from "../../api/charactersRequests.ts";

const CharacterInfo: FC = () => {
    const {id} = useParams<"id">();
    const [character, setCharacter] = useState<ICharacter[]>([]);

    useEffect(() => {
        charactersRequests.getCharacterById(id as number)
            .then(data => {
                const charactersArray: ICharacter[]  = data.map(character => {
                    return {
                        id: character.id,
                        name: character.name,
                        desc: character.description,
                        image: character.thumbnail.path + "." + character.thumbnail.extension
                        //для получения списка комиксов используется другой запрос GET /v1/public/characters/{characterId}/comics
                    }
                })
                setCharacter(charactersArray);
            });
    }, []);

    return(
        <section className={styles.characterInfo}>
            <img className={styles.portrait} src={character[0]?.image} alt="portrait"/>
            <div className={styles.info}>
                <div className={styles.descriptionWrapper}>
                    <h3>{character[0]?.name}</h3>
                    <h4>{character[0]?.desc == "" ? "No description" : character[0]?.desc}</h4>
                </div>
                <div className={styles.comicsList}>
                    <h3>Comics with this character:</h3>
                    {character[0]?.comics?.map((comicsIndex, index) => {
                        return <Link key={index} className="link" to={"/comics/" + comicsIndex}>
                            <h4>{comics[comicsIndex].name}</h4>
                        </Link>
                    })}
                </div>
            </div>
        </section>
    )
}

export default CharacterInfo;
