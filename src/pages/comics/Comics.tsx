import {FC, useEffect, useState} from "react";
import styles from "./styles.module.css"
import {Link} from "react-router-dom";
import SearchBar from "../../components/searchBar/SearchBar.tsx";
import {IComics} from "../../types/IComics.tsx";
import comicsRequests from "../../api/comicsRequests.ts";

const Comics: FC = () => {
    const [comics, setComics] = useState<IComics[]>([]);
    const comicsAmount: number = comics.length;

    useEffect(() => {
        comicsRequests.getComics()
            .then(data => {
                const comicsArray: IComics[] = data.map(comics => {
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
        <section className={styles.comicsPage}>
            <SearchBar subject="Comics" amount={comicsAmount}/>
            <hr className={styles.divider}/>
            <div className={styles.comicsList}>
                {comics.map((comics, index) => {
                    return <Link key={index} className="link" to={"/comics/" + comics.id}>
                        <div className={styles.comics}>{comics.title}</div>
                    </Link>
                })}
            </div>
        </section>
    )
}

export default Comics;

