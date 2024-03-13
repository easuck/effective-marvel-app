import {FC, useEffect, useState} from "react";
import styles from "./styles.module.css"
import CharacterCard from "../../components/characterCard/CharacterCard.tsx";
import SearchBar from "../../components/searchBar/SearchBar.tsx";
import charactersRequests from "../../api/charactersRequests.ts"
import {ICharacter} from "../../types/ICharacter.tsx";

const Characters: FC = () => {
    const [characters, setCharacters] = useState<ICharacter[]>([]);
    const charactersAmount: number = characters.length;

    useEffect(() => {
        let result = charactersRequests.getCharacters();
        result.then(data => {
            data.map(character => {
                let characterModel: ICharacter = {
                    id: character.id,
                    name: character.name,
                    desc: character.description,
                    image: character.thumbnail.path + "." + character.thumbnail.extension
                }
                //setCharacters([...characters, characterModel]);
                characters.push(characterModel);
            })
        })
        console.log(characters);
    }, []);

    return(
        <section className={styles.characters}>
            <SearchBar subject="Characters" amount={charactersAmount}/>
            <hr className={styles.divider}/>
            <div className={styles.charactersGrid}>
                {characters.map((character, index) => {
                    return <CharacterCard key={character.id} id={character.id} image={character.image} name={character.name}
                                          desc={character.desc}/>
                })}
            </div>
        </section>
    )
};

export default Characters;
