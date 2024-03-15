import {FC, useEffect, useState} from "react";
import styles from "./styles.module.css"
import {Link, useParams} from "react-router-dom";
import {ICharacter} from "../../types/ICharacter.tsx";
import charactersRequests from "../../api/charactersRequests.ts";
import {IComics} from "../../types/IComics.tsx";

const CharacterInfo: FC = () => {
    const {id} = useParams<"id">();
    const [character, setCharacter] = useState<ICharacter[]>([]);
    const [comics, setComics] = useState<IComics[]>([]);

    useEffect(() => {
        charactersRequests.getCharacterById(id as unknown as number)
            .then(data => {
                const charactersArray: ICharacter[]  = data.map(character => {
                    return {
                        id: character.id,
                        name: character.name,
                        desc: character.description,
                        image: character.thumbnail.path + "." + character.thumbnail.extension
                    }
                })
                setCharacter(charactersArray);
            });
    }, []);

    useEffect(() => {
        charactersRequests.getCharacterComicsById(id as unknown as number)
            .then(data => {
                const comicsArray: IComics[] = data.map(comics => {
                    return {
                        id: comics.id,
                        title: comics. title
                    }
                })
                setComics(comicsArray);
            })
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
                    {comics.length == 0 ? <h4>No comics</h4> :
                        comics.map((comics) => {
                            return <Link key={comics.id} className="link" to={`/comics/${comics.id}`}>
                                <h4>{comics.title}</h4>
                            </Link>
                        })
                    }
                </div>
            </div>
        </section>
    )
}

export default CharacterInfo;
