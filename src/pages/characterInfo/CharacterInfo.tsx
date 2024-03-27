import {FC, useEffect} from "react";
import styles from "./styles.module.css"
import {Link, useParams} from "react-router-dom";
import {ICharacter} from "../../types/ICharacter.tsx";
import charactersRequests from "../../api/charactersRequests.ts";
import {IComics} from "../../types/IComics.tsx";
import {characterInfoStore as store} from "../../stores/CharacterInfoStore.ts";
import {observer} from "mobx-react-lite";
import {ColorRing} from "react-loader-spinner";

const CharacterInfo: FC = observer(() => {
    const {id} = useParams<"id">();

    useEffect(() => {
        charactersRequests.getCharacterById(id as unknown as number)
            .then(data => {
                const charactersArray: ICharacter[] = data.data.results.map(character => {
                    const comicsArray: IComics[] = character.comics.items.map(comics => {
                        return {
                            id: comics.resourceURI.split('/').slice(-1).toString(),
                            title: comics.name
                        }
                    })
                    return {
                        id: character.id,
                        name: character.name,
                        desc: character.description,
                        image: character.thumbnail.path + "." + character.thumbnail.extension,
                        comics: comicsArray
                    }
                })
                store.setCharacter(charactersArray);
            });
    }, []);

    return(
        <section className={styles.characterInfo}>
        {store.loading ? (
            <div className={styles.loaderContainer}>
                <ColorRing colors={["red", "red", "red", "red", "red"]}/>
            </div>
            ) : (
            <>
                <img className={styles.portrait} src={store.character[0]?.image} alt="portrait"/>
                <div className={styles.info}>
                    <div className={styles.descriptionWrapper}>
                        <h3>{store.character[0]?.name}</h3>
                        <h4>{store.character[0]?.desc == "" ? "No description" : store.character[0]?.desc}</h4>
                    </div>
                    <div className={styles.comicsList}>
                        <h3>Comics with this character:</h3>
                        {store.character[0]?.comics.length == 0 ? <h4>No comics</h4> :
                            store.character[0]?.comics.map((comics) => {
                                return <Link key={comics.id} className="link" to={`/comics/${comics.id}`}>
                                    <h4>{comics.title}</h4>
                                </Link>
                            })
                        }
                    </div>
                </div>
            </>
            )
        }
        </section>
    )
});

export default CharacterInfo;
