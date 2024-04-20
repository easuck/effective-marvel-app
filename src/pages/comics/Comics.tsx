import React, {FC, useEffect} from "react";
import styles from "./styles.module.css"
import SearchBar from "../../components/searchBar/SearchBar.tsx";
import Card from "../../components/card/Card.tsx";
import useDebounce from "../../hooks/useDebounce.tsx";
import {observer} from "mobx-react-lite";
import comicsStore from "../../stores/ComicsStore.ts";
import Loader from "../../components/loader/Loader.tsx";
import {VirtuosoGrid} from "react-virtuoso";

const Comics: FC = observer(() => {
    const {inputValue, comicsAmount, comics, loading, page, searchValue} = comicsStore;
    const debouncedInput = useDebounce(inputValue, 1500);

    useEffect(() => {
        comicsStore.searchComics();
    }, []);

    useEffect(() => {
        if (debouncedInput) comicsStore.searchComicsByTitle();
    }, [debouncedInput]);

    const inputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        comicsStore.setInputValue(event.target.value);
    }

    const searchComicsByTitleWrapper = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        comicsStore.searchComicsByTitle();
    }

    const canselDebounce = () => {
        comicsStore.setInputValue("");
    }

    const loadMore = () => {
        comicsStore.setPage(page + 1);
        searchValue ? comicsStore.addNextComicsByTitle() : comicsStore.addNextComics();
    }

    return(
        <section className={styles.comicsPage}>
            <SearchBar subject="Comics" amount={comicsAmount} inputHandler={inputHandler} callback={searchComicsByTitleWrapper}
                       searchWord={inputValue} canselDebounce={canselDebounce}/>
            <hr className={styles.divider}/>
            {loading ? <Loader/> : (
                <VirtuosoGrid
                    listClassName={styles.comicsGrid}
                    useWindowScroll={true}
                    totalCount={comics.length}
                    endReached={loadMore}
                    components={{Footer: Loader}}
                    itemContent={(index) => <Card key={comics[index].id} id={comics[index].id} image={comics[index].image}
                                                  name={comics[index].title}
                                                  desc={comics[index].desc} link="comics"/>}
                />
                )
            }
        </section>
    )
});

export default Comics;

