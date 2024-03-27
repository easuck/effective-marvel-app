import {FC, useEffect} from "react";
import styles from "./styles.module.css"
import Card from "../../components/card/Card.tsx";
import SearchBar from "../../components/searchBar/SearchBar.tsx";
import charactersRequests from "../../api/charactersRequests.ts"
import {ICharacter} from "../../types/ICharacter.tsx";
import Pagination from "../../components/pagination/Pagination.tsx";
import useDebounce from "../../hooks/useDebounce.tsx";
import {ColorRing} from "react-loader-spinner";
import {charactersStore as store} from "../../stores/CharactersStore.ts";
import {observer} from "mobx-react-lite";

const Characters: FC = observer(() => {
    const debouncedInput = useDebounce(store.searchCharacter, 3000);
    const charactersOnPage : number = 36;

    useEffect(() => {
        charactersRequests.getCharacters(charactersOnPage,(store.page - 1) * charactersOnPage)
            .then(data => {
                const charactersArray: ICharacter[]  = data.data.results.map(character => {
                    return {
                        id: character.id,
                        name: character.name,
                        desc: character.description,
                        image: character.thumbnail.path + "." + character.thumbnail.extension
                    }
                })
                store.setCharacters(charactersArray);
                store.setCharactersAmount(data.data.total);
                store.setPagesAmount(Math.ceil(store.charactersAmount / charactersOnPage));
            })
    }, [store.page]);

    useEffect(() => {
        if (debouncedInput) searchCharactersByNameDebounce();
    }, [debouncedInput]);

    const inputHandler = (event: any) => {
        store.setSearchCharacter(event.target.value);
    }

    const searchCharactersByName = (event: any) => {
        event.preventDefault();
        charactersRequests.searchCharacterByName(charactersOnPage, store.searchCharacter)
        .then(data => {
            const charactersArray: ICharacter[]  = data.data.results.map(character => {
                return {
                    id: character.id,
                    name: character.name,
                    desc: character.description,
                    image: character.thumbnail.path + "." + character.thumbnail.extension
                }
            })
            store.setCharacters(charactersArray);
        })
    }

    const searchCharactersByNameDebounce = () => {
        charactersRequests.searchCharacterByName(charactersOnPage, store.searchCharacter)
            .then(data => {
                const charactersArray: ICharacter[]  = data.data.results.map(character => {
                    return {
                        id: character.id,
                        name: character.name,
                        desc: character.description,
                        image: character.thumbnail.path + "." + character.thumbnail.extension
                    }
                })
                store.setCharacters(charactersArray);
            })
    }

    return(
        <section className={styles.characters}>
            <SearchBar subject="Characters" amount={store.charactersAmount} inputHandler={inputHandler} callback={searchCharactersByName} searchWord={store.searchCharacter}/>
            <hr className={styles.divider}/>
            {store.loading ? (
                <div className={styles.loaderContainer}>
                    <ColorRing colors={["red", "red", "red", "red", "red"]}/>
                </div>
                ) : (
                <div className={styles.charactersGrid}>
                    {store.characters.map((character) => {
                        return <Card key={character.id} id={character.id} image={character.image}
                                     name={character.name}
                                     desc={character.desc} link="characters"/>
                    })}
                </div>
                )
            }
            <Pagination pagesAmount={store.pagesAmount} page={store.page} setPage={store.setPage}/>
        </section>
    )
});

export default Characters;
