import {FC} from "react";
import styles from "./styles.module.css"
import CharacterCard from "./card/characterCard.tsx";
import {characters} from "../../data/CharactersData.tsx";

const Characters: FC = () => {
    let charactersAmount: number = characters.length;

    return(
        <section>
            <div className={styles.aboveInputWrapper}>
                <h3 className={styles.aboveInputCharacters}>Characters</h3>
                <h3 className={styles.aboveInputAmount}>({charactersAmount})</h3>
            </div>
            <div className={styles.charactersGrid}>
                <form className={styles.form}>
                    <input placeholder="Search for Character by Name"/>
                    <button>SEARCH</button>
                </form>
                <hr className={styles.divider}/>
                {characters.map(character =>{
                    return <CharacterCard image={character.image} name={character.name} desc={character.desc}/>
                })}
                {characters.map(character =>{
                    return <CharacterCard image={character.image} name={character.name} desc={character.desc}/>
                })}
                {characters.map(character =>{
                    return <CharacterCard image={character.image} name={character.name} desc={character.desc}/>
                })}
            </div>
        </section>
    )
};

export default Characters;
