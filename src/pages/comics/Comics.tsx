import {FC, useEffect, useState} from "react";
import styles from "./styles.module.css"
import SearchBar from "../../components/searchBar/SearchBar.tsx";
import {IComics} from "../../types/IComics.tsx";
import comicsRequests from "../../api/comicsRequests.ts";
import Card from "../../components/card/Card.tsx";
import charactersRequests from "../../api/charactersRequests.ts";
import {ICharacter} from "../../types/ICharacter.tsx";
import Pagination from "../../components/pagination/Pagination.tsx";

const Comics: FC = () => {
    const [comics, setComics] = useState<IComics[]>([]);
    const [searchComics, setSearchComics] = useState<string>("");

    const [page, setPage] = useState<number>(1);
    const comicsOnPage : number = 18;
    const pagesAmount: number = 5;
    const comicsAmount: number = comicsOnPage * pagesAmount;


    useEffect(() => {
        comicsRequests.getComics(comicsOnPage, (page - 1) * comicsOnPage)
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
    }, [page]);

    const inputHandler = (event: any) => {
        setSearchComics(event.target.value);
    }

    const searchComicsByTitle = (event: any) => {
        event.preventDefault();
        comicsRequests.searchComicsByTitle(searchComics)
            .then(data => {
                const comicsArray: IComics[]  = data.map(comics => {
                    return {
                        id: comics.id,
                        title: comics.title,
                        desc: comics.description,
                        image: comics.thumbnail.path + "." + comics.thumbnail.extension
                    }
                })
                setComics(comicsArray);
            })
    }

    return(
        <section className={styles.comicsPage}>
            <SearchBar subject="Comics" amount={comicsAmount} inputHandler={inputHandler} searchContent={searchComicsByTitle} searchWord={searchComics}/>
            <hr className={styles.divider}/>
            <div className={styles.comicsGrid}>
                {comics.map((comics) => {
                    return <Card key={comics.id} id={comics.id} image={comics.image} name={comics.title}
                        desc={comics.desc} link="comics"/>
                })}
            </div>
            <Pagination pagesAmount={pagesAmount} page={page} setPage={setPage}/>
        </section>
    )
}

export default Comics;

