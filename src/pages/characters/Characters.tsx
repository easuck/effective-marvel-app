import {FC, useEffect, useState} from "react";
import styles from "./styles.module.css"
import Card from "../../components/card/Card.tsx";
import SearchBar from "../../components/searchBar/SearchBar.tsx";
import charactersRequests from "../../api/charactersRequests.ts"
import {ICharacter} from "../../types/ICharacter.tsx";
import Pagination from "../../components/pagination/Pagination.tsx";
import useDebounce from "../../hooks/useDebounce.tsx";

const Characters: FC = () => {
    const [characters, setCharacters] = useState<ICharacter[]>([]);
    const [searchCharacter, setSearchCharacter] = useState<string>("");
    const debouncedInput = useDebounce(searchCharacter, 3000);

    const [page, setPage] = useState<number>(1);
    const charactersOnPage : number = 18;
    const pagesAmount: number = 5;
    const charactersAmount: number = charactersOnPage * pagesAmount;

    useEffect(() => {
        charactersRequests.getCharacters(charactersOnPage, (page - 1) * charactersOnPage)
            .then(data => {
                const charactersArray: ICharacter[]  = data.map(character => {
                    return {
                        id: character.id,
                        name: character.name,
                        desc: character.description,
                        image: character.thumbnail.path + "." + character.thumbnail.extension
                    }
                })
                setCharacters(charactersArray);
            })
    }, [page]);

    useEffect(() => {
        if (debouncedInput) searchCharactersByNameDebounce();
    }, [debouncedInput]);

    const inputHandler = (event: any) => {
        setSearchCharacter(event.target.value);
    }

    const searchCharactersByName = (event: any) => {
        event.preventDefault();
        charactersRequests.searchCharacterByName(charactersOnPage, searchCharacter)
        .then(data => {
            const charactersArray: ICharacter[]  = data.map(character => {
                return {
                    id: character.id,
                    name: character.name,
                    desc: character.description,
                    image: character.thumbnail.path + "." + character.thumbnail.extension
                }
            })
            setCharacters(charactersArray);
        })
    }

    const searchCharactersByNameDebounce = () => {
        charactersRequests.searchCharacterByName(charactersOnPage, searchCharacter)
            .then(data => {
                const charactersArray: ICharacter[]  = data.map(character => {
                    return {
                        id: character.id,
                        name: character.name,
                        desc: character.description,
                        image: character.thumbnail.path + "." + character.thumbnail.extension
                    }
                })
                setCharacters(charactersArray);
            })
    }

    return(
        <section className={styles.characters}>
            <SearchBar subject="Characters" amount={charactersAmount} inputHandler={inputHandler} callback={searchCharactersByName} searchWord={searchCharacter}/>
            <hr className={styles.divider}/>
            <div className={styles.charactersGrid}>
                {characters.map((character) => {
                    return <Card key={character.id} id={character.id} image={character.image} name={character.name}
                                 desc={character.desc} link="characters"/>
                })}
            </div>
            <Pagination pagesAmount={pagesAmount} page={page} setPage={setPage}/>
        </section>
    )
};

export default Characters;
