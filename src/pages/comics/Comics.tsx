import {FC, useEffect} from "react";
import styles from "./styles.module.css"
import SearchBar from "../../components/searchBar/SearchBar.tsx";
import {IComics} from "../../types/IComics.tsx";
import comicsRequests from "../../api/comicsRequests.ts";
import Card from "../../components/card/Card.tsx";
import Pagination from "../../components/pagination/Pagination.tsx";
import useDebounce from "../../hooks/useDebounce.tsx";

type Props = {
    comics: IComics[];
    setComics: (comics: IComics[]) => void;
    searchComics: string;
    setSearchComics: (searchComics: string) => void;
    page: number;
    setPage: (page: number) => void;
}
const Comics: FC<Props> =
    ({comics, searchComics, page,
         setComics, setSearchComics, setPage}) => {
    const debouncedInput = useDebounce(searchComics, 3000);
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

    useEffect(() => {
        if (debouncedInput) searchComicsByTitleDebounce();
    }, [debouncedInput]);

    const inputHandler = (event: any) => {
        setSearchComics(event.target.value);
    }

    const searchComicsByTitle = (event: any) => {
        event.preventDefault();
        comicsRequests.searchComicsByTitle(comicsOnPage, searchComics)
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

    const searchComicsByTitleDebounce = () => {
        comicsRequests.searchComicsByTitle(comicsOnPage, searchComics)
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
            <SearchBar subject="Comics" amount={comicsAmount} inputHandler={inputHandler} callback={searchComicsByTitle} searchWord={searchComics}/>
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
};

export default Comics;

