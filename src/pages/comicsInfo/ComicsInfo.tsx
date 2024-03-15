import {FC, useEffect, useState} from "react";
import styles from "./styles.module.css"
import {Link, useParams} from "react-router-dom";
import {IComics} from "../../types/IComics.tsx";
import comicsRequests from "../../api/comicsRequests.ts";
import {ICharacter} from "../../types/ICharacter.tsx";

const ComicsInfo: FC = () =>{
    const {id} = useParams<"id">();
    const [comics, setComics] = useState<IComics[]>([]);
    const [characters, setCharacters] = useState<ICharacter[]>([]);

    useEffect(() => {
        comicsRequests.getComicsById(id as number)
            .then(data => {
                const comicsArray = data.map(comics => {
                    return {
                        id: comics.id,
                        title: comics.title,
                        desc: comics.description,
                        image: comics.thumbnail.path + "." + comics.thumbnail.extension
                    }
                })
                setComics(comicsArray);
            })
    }, []);

    useEffect(() => {
        comicsRequests.getComicsCharactersById(id as number)
            .then(data => {
                const charactersArray: ICharacter[] = data.map(character => {
                    return {
                        id: character.id,
                        name: character.name
                    }
                })
                setCharacters(charactersArray);
            })
    }, [])


    return(
        <section className={styles.comicsInfo}>
            <img className={styles.portrait} src={comics[0]?.image} alt="portrait"/>
            <div className={styles.info}>
                <div className={styles.descriptionWrapper}>
                    <h3>{comics[0]?.title}</h3>
                    <h4>{comics[0]?.desc == "" ? "No description" : comics[0]?.desc}</h4>
                </div>
                <div className={styles.charactersList}>
                    <h3>Characters in this comics:</h3>
                    {characters.map(character => {
                        return <Link key={character.id} className="link" to={`/characters/${character.id}`}>
                            <h4>{character.name}</h4>
                        </Link>
                    })}
                </div>
            </div>
        </section>
    )
}

export default ComicsInfo;