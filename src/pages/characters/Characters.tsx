import {FC, useEffect, useState} from "react";
import styles from "./styles.module.css"
import Card from "../../components/card/Card.tsx";
import SearchBar from "../../components/searchBar/SearchBar.tsx";
import charactersRequests from "../../api/charactersRequests.ts"
import {ICharacter} from "../../types/ICharacter.tsx";

const Characters: FC = () => {
    const [characters, setCharacters] = useState<ICharacter[]>([]);
    const charactersAmount: number = characters.length;
    const [searchCharacter, setSearchCharacter] = useState<string>("");

    useEffect(() => {
        charactersRequests.getCharacters()
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
    }, []);

    const inputHandler = (event: any) => {
        setSearchCharacter(event.target.value);
        console.log(searchCharacter);
    }

    const searchCharactersByName = (event: any) => {
        event.preventDefault();
        charactersRequests.searchCharacterByName(searchCharacter)
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
            <SearchBar subject="Characters" amount={charactersAmount} inputHandler={inputHandler} searchContent={searchCharactersByName} searchWord={searchCharacter}/>
            <hr className={styles.divider}/>
            <div className={styles.charactersGrid}>
                {characters.map((character) => {
                    return <Card key={character.id} id={character.id} image={character.image} name={character.name}
                                 desc={character.desc} link="characters"/>
                })}
            </div>
        </section>
    )
};

export default Characters;
