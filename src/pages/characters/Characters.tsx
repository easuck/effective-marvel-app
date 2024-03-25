import {FC, useEffect} from "react";
import styles from "./styles.module.css"
import Card from "../../components/card/Card.tsx";
import SearchBar from "../../components/searchBar/SearchBar.tsx";
import charactersRequests from "../../api/charactersRequests.ts"
import {ICharacter} from "../../types/ICharacter.tsx";
import Pagination from "../../components/pagination/Pagination.tsx";
import useDebounce from "../../hooks/useDebounce.tsx";
import {ColorRing} from "react-loader-spinner";
import charactersStore from "../../stores/CharactersStore.ts";
import {observer} from "mobx-react-lite";

/*type Props = {
    characters: ICharacter[];
    setCharacters: (characters: ICharacter[]) => void;
    searchCharacter: string;
    setSearchCharacter: (searchCharacter: string) => void;
    page: number;
    setPage: (page: number) => void;
    loading: boolean;
}*/

const Characters: FC = observer(() => {
        /*{characters, searchCharacter, page,
            setCharacters, setSearchCharacter, setPage, loading}*/
    const debouncedInput = useDebounce(charactersStore.searchCharacter, 3000);
    const charactersOnPage : number = 18;
    const pagesAmount: number = 5;
    const charactersAmount: number = charactersOnPage * pagesAmount;

    useEffect(() => {
        charactersRequests.getCharacters(charactersOnPage, (charactersStore.page - 1) * charactersOnPage)
            .then(data => {
                const charactersArray: ICharacter[]  = data.map(character => {
                    return {
                        id: character.id,
                        name: character.name,
                        desc: character.description,
                        image: character.thumbnail.path + "." + character.thumbnail.extension
                    }
                })
                charactersStore.setCharacters(charactersArray);
            })
    }, [charactersStore.page]);

    useEffect(() => {
        if (debouncedInput) searchCharactersByNameDebounce();
    }, [debouncedInput]);

    const inputHandler = (event: any) => {
        charactersStore.setSearchCharacter(event.target.value);
    }

    const searchCharactersByName = (event: any) => {
        event.preventDefault();
        charactersRequests.searchCharacterByName(charactersOnPage, charactersStore.searchCharacter)
        .then(data => {
            const charactersArray: ICharacter[]  = data.map(character => {
                return {
                    id: character.id,
                    name: character.name,
                    desc: character.description,
                    image: character.thumbnail.path + "." + character.thumbnail.extension
                }
            })
            charactersStore.setCharacters(charactersArray);
        })
    }

    const searchCharactersByNameDebounce = () => {
        charactersRequests.searchCharacterByName(charactersOnPage, charactersStore.searchCharacter)
            .then(data => {
                const charactersArray: ICharacter[]  = data.map(character => {
                    return {
                        id: character.id,
                        name: character.name,
                        desc: character.description,
                        image: character.thumbnail.path + "." + character.thumbnail.extension
                    }
                })
                charactersStore.setCharacters(charactersArray);
            })
    }

    return(
        <section className={styles.characters}>
            <SearchBar subject="Characters" amount={charactersAmount} inputHandler={inputHandler} callback={searchCharactersByName} searchWord={charactersStore.searchCharacter}/>
            <hr className={styles.divider}/>
            {charactersStore.loading ? (
                <div className={styles.loaderContainer}>
                    <ColorRing colors={["red", "red", "red", "red", "red"]}/>
                </div>
                ) : (
                <div className={styles.charactersGrid}>
                    {charactersStore.characters.map((character) => {
                        return <Card key={character.id} id={character.id} image={character.image}
                                     name={character.name}
                                     desc={character.desc} link="characters"/>
                    })}
                </div>
                )
            }
            <Pagination pagesAmount={pagesAmount} page={charactersStore.page} setPage={charactersStore.setPage}/>
        </section>
    )
});

export default Characters;
