import {FC} from "react";
import styles from "./styles.module.css"
import CharacterCard from "../../components/characterCard/characterCard.tsx";
import {characters} from "../../data/charactersData.tsx";
import characterCard from "../../components/characterCard/characterCard.tsx";
import SearchBar from "../../components/searchBar/searchBar.tsx";

const Characters: FC = () => {
    let charactersAmount: number = characters.length;

    return(
        <section className={styles.characters}>
            <div className={styles.labelWrapper}>
                <h3 className={styles.labelCharacters}>Characters</h3>
                <h3 className={styles.labelAmount}>({charactersAmount})</h3>
            </div>
            <SearchBar/>
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
