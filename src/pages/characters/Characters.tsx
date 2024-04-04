import React, {FC, useEffect} from "react";
import styles from "./styles.module.css"
import Card from "../../components/card/Card.tsx";
import SearchBar from "../../components/searchBar/SearchBar.tsx";
import Pagination from "../../components/pagination/Pagination.tsx";
import useDebounce from "../../hooks/useDebounce.tsx";
import {ColorRing} from "react-loader-spinner";
import {observer} from "mobx-react-lite";
import favouritesStore from "../../stores/FavouritesStore.ts";
import charactersStore from "../../stores/CharactersStore.ts";

const Characters: FC = observer(() => {
    const {inputValue, charactersAmount, loading, characters, page, pagesAmount } = charactersStore;
    const {favouritesAmount} = favouritesStore;
    const debouncedInput = useDebounce(inputValue, 1500);

    useEffect(() => {
        charactersStore.searchCharacters();
    }, []);

    useEffect(() => {
        if (debouncedInput) charactersStore.searchCharactersByName();
    }, [debouncedInput]);

    const searchCharactersByNameWrapper = (event?: React.MouseEvent<HTMLButtonElement>) => {
        if (event) event.preventDefault();
        charactersStore.searchCharactersByName()
    }

    const canselDebounce = () => {
        charactersStore.setSearchCharacter("");
    }

    const inputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        charactersStore.setSearchCharacter(event.target.value);
    }

    return(
        <section className={styles.characters}>
            <SearchBar subject="Characters" amount={charactersAmount} inputHandler={inputHandler} callback={searchCharactersByNameWrapper}
                       searchWord={inputValue} canselDebounce={canselDebounce}/>
            <hr className={styles.divider}/>
            {loading ? (
                <div className={styles.loaderContainer}>
                    <ColorRing colors={["red", "red", "red", "red", "red"]}/>
                </div>
                ) : (
                <>
                    <div className={styles.charactersGrid}>
                        {characters.map((character) => {
                            return <Card key={character.id} id={character.id} image={character.image}
                                         name={character.name}
                                         desc={character.desc} link="characters"
                                         favouritesAmount={favouritesAmount} setFavouritesAmount={favouritesStore.setFavouritesAmount}/>
                        })}
                    </div>
                    <Pagination pagesAmount={pagesAmount} page={page} setPage={charactersStore.setPage}/>
                </>
                )
            }
        </section>
    )
});

export default Characters;
