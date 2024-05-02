import {FC, useEffect} from "react";
import styles from "./styles.module.css"
import {Link, useParams} from "react-router-dom";
import {characterInfoStore} from "../../stores/CharacterInfoStore.ts";
import {observer} from "mobx-react-lite";
import {ColorRing} from "react-loader-spinner";

const CharacterInfo: FC = observer(() => {
    const {id} = useParams<"id">();
    const {character, loading} = characterInfoStore;

    useEffect(() => {
        characterInfoStore.getCharacterById(id);
    }, []);

    return(
        <section className={styles.characterInfo}>
        {loading ? (
            <div className={styles.loaderContainer}>
                <ColorRing colors={["red", "red", "red", "red", "red"]}/>
            </div>
            ) : (
            <>
                <img className={styles.portrait} src={character[0]?.image} alt="portrait"/>
                <div className={styles.info}>
                    <div className={styles.descriptionWrapper}>
                        <h3>{character[0]?.name}</h3>
                        <h4>{character[0]?.desc == "" ? "No description" : character[0]?.desc}</h4>
                    </div>
                    <div className={styles.comicsList}>
                        <h3>Comics with this character:</h3>
                        {character[0]?.comics.length == 0 ? <h4>No comics</h4> :
                            character[0]?.comics.map((comics) => {
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
