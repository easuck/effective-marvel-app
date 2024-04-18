import React, {FC, useEffect} from "react";
import styles from "./styles.module.css"
import Card from "../../components/card/Card.tsx";
import SearchBar from "../../components/searchBar/SearchBar.tsx";
import useDebounce from "../../hooks/useDebounce.tsx";
import {observer} from "mobx-react-lite";
import charactersStore from "../../stores/CharactersStore.ts";
import {VirtuosoGrid} from "react-virtuoso";
import Loader from "../../components/loader/Loader.tsx";

const Characters: FC = observer(() => {
    const {inputValue, charactersAmount, loading, characters, page, searchValue } = charactersStore;
    const debouncedInput = useDebounce(inputValue, 1500);

    useEffect(() => {
        charactersStore.searchCharacters();
    }, []);

    useEffect(() => {
        if (debouncedInput) charactersStore.searchCharactersByName();
    }, [debouncedInput]);

    const searchCharactersByNameWrapper = (event?: React.MouseEvent<HTMLButtonElement>) => {
        if (event) event.preventDefault();
        charactersStore.searchCharactersByName();
    }

    const canselDebounce = () => {
        charactersStore.setInputValue("");
    }

    const inputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        charactersStore.setInputValue(event.target.value);
    }

    const loadMore = () => {
        charactersStore.setPage(page + 1);
        !searchValue ? charactersStore.addNextCharacters() : charactersStore.addNextCharactersByName();
    }

    return (
        <section className={styles.characters}>
            <SearchBar subject="Characters" amount={charactersAmount} inputHandler={inputHandler} callback={searchCharactersByNameWrapper}
                       searchWord={inputValue} canselDebounce={canselDebounce}/>
            <hr className={styles.divider}/>
            {loading ? <Loader/> : (
                    <VirtuosoGrid
                        listClassName={styles.charactersGrid}
                        useWindowScroll={true}
                        totalCount={characters.length}
                        endReached={loadMore}
                        components={{Footer: Loader}}
                        itemContent={(index) => <Card key={characters[index].id} id={characters[index].id} image={characters[index].image}
                                                      name={characters[index].name}
                                                      desc={characters[index].desc} link="characters"/>}
                    />
                )
            }
        </section>
    )
});

export default Characters;
