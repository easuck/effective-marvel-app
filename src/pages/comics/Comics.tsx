import {FC, useEffect, useState} from "react";
import styles from "./styles.module.css"
import SearchBar from "../../components/searchBar/SearchBar.tsx";
import {IComics} from "../../types/IComics.tsx";
import comicsRequests from "../../api/comicsRequests.ts";
import Card from "../../components/card/Card.tsx";

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
            <div className={styles.comicsGrid}>
                {comics.map((comics) => {
                    return <Card key={comics.id} id={comics.id} image={comics.image} name={comics.title}
                        desc={comics.desc} link="comics"/>
                })}
            </div>
        </section>
    )
}

export default Comics;

