import {FC} from "react";
import styles from "./styles.module.css"
import CharacterCard from "../../components/characterCard/CharacterCard.tsx";
import {characters} from "../../data/charactersData.tsx";
import characterCard from "../../components/characterCard/CharacterCard.tsx";
import SearchBar from "../../components/searchBar/SearchBar.tsx";

const Characters: FC = () => {
    let charactersAmount: number = characters.length;

    return(
        <section className={styles.characters}>
            <SearchBar subject="Characters" amount={charactersAmount}/>
            <hr className={styles.divider}/>
            <div className={styles.charactersGrid}>
                {characters.map((character, index) => {
                    return <CharacterCard key={index} id={character.id} image={character.image} name={character.name}
                                          desc={character.desc}/>
                })}
                {characters.map((character, index) => {
                    return <CharacterCard key={index} id={character.id} image={character.image} name={character.name}
                                          desc={character.desc}/>
                })}
                {characters.map((character,index) => {
                    return  <CharacterCard key={index} id={character.id} image={character.image} name={character.name}
                                          desc={character.desc}/>
                })}
            </div>
        </section>
    )
};

export default Characters;
