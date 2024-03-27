import {FC, useEffect} from "react";
import styles from "./styles.module.css"
import {Link, useParams} from "react-router-dom";
import {comicsInfoStore as store} from "../../stores/ComicsInfoStore.ts";
import {ColorRing} from "react-loader-spinner";
import {observer} from "mobx-react-lite";

const ComicsInfo: FC = observer(() => {
    const {id} = useParams<"id">();

    useEffect(() => {
        store.getComicsById(id);
    }, []);

    return(
        <section className={styles.comicsInfo}>
        {store.loading ? (
            <div className={styles.loaderContainer}>
                <ColorRing colors={["red", "red", "red", "red", "red"]}/>
            </div>
            ) : (
            <>
                <img className={styles.portrait} src={store.comics[0]?.image} alt="portrait"/>
                <div className={styles.info}>
                    <div className={styles.descriptionWrapper}>
                        <h3>{store.comics[0]?.title}</h3>
                        <h4>{store.comics[0]?.desc == "" ? "No description" : store.comics[0]?.desc}</h4>
                    </div>
                    <div className={styles.charactersList}>
                        <h3>Characters in this comics:</h3>
                        {store.comics[0]?.characters.length == 0 ? <h4>No characters</h4> :
                            store.comics[0]?.characters.map(character => {
                                return <Link key={character.id} className="link" to={`/characters/${character.id}`}>
                                    <h4>{character.name}</h4>
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

export default ComicsInfo;