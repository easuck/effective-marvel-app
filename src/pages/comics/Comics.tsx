import React, {FC, useEffect} from "react";
import styles from "./styles.module.css"
import SearchBar from "../../components/searchBar/SearchBar.tsx";
import Card from "../../components/card/Card.tsx";
import Pagination from "../../components/pagination/Pagination.tsx";
import useDebounce from "../../hooks/useDebounce.tsx";
import {observer} from "mobx-react-lite";
import {comicsStore, comicsStore as store} from "../../stores/ComicsStore.ts";
import {ColorRing} from "react-loader-spinner";

const Comics: FC = observer(() => {
    const {inputValue, comicsAmount, comics, loading, page, pagesAmount} = comicsStore;
    const debouncedInput = useDebounce(inputValue, 1500);

    useEffect(() => {
        store.searchComics();
    }, []);

    useEffect(() => {
        if (debouncedInput) store.searchComicsByTitle();
    }, [debouncedInput]);

    const inputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        store.setInputValue(event.target.value);
    }

    const searchComicsByTitleWrapper = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        store.searchComicsByTitle();
    }

    const canselDebounce = () => {
        store.setInputValue("");
    }

    return(
        <section className={styles.comicsPage}>
            <SearchBar subject="Comics" amount={comicsAmount} inputHandler={inputHandler} callback={searchComicsByTitleWrapper}
                       searchWord={inputValue} canselDebounce={canselDebounce}/>
            <hr className={styles.divider}/>
            {loading ? (
                <div className={styles.loaderContainer}>
                    <ColorRing colors={["red", "red", "red", "red", "red"]}/>
                </div>
                ) : (
                <>
                    <div className={styles.comicsGrid}>
                        {comics.map((comics) => {
                            return <Card key={comics.id} id={comics.id} image={comics.image} name={comics.title}
                                         desc={comics.desc} link="comics"/>
                        })}
                    </div>
                    <Pagination pagesAmount={pagesAmount} page={page} setPage={store.setPage}/>
                </>
                )
            }
        </section>
    )
});

export default Comics;

