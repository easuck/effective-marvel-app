import {FC, useEffect, useState} from "react";
import styles from "./styles.module.css"
import {Link, useParams} from "react-router-dom";
import {IComics} from "../../types/IComics.tsx";
import comicsRequests from "../../api/comicsRequests.ts";

const ComicsInfo: FC = () =>{
    const {id} = useParams<"id">();
    const [comics, setComics] = useState<IComics[]>([]);

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
                </div>
            </div>
        </section>
    )
}

export default ComicsInfo;