import {FC} from "react";
import styles from "./styles.module.css"
import CharacterCard from "./card/characterCard.tsx";
import {characters} from "../../data/charactersData.tsx";
import characterCard from "./card/characterCard.tsx";

const Characters: FC = () => {
    let charactersAmount: number = characters.length;

    return(
        <section className={styles.characters}>
            <div className={styles.aboveInputWrapper}>
                <h3 className={styles.aboveInputCharacters}>Characters</h3>
                <h3 className={styles.aboveInputAmount}>({charactersAmount})</h3>
            </div>
            <form className={styles.form}>
                <input placeholder="Search for Character by Name"/>
                <button>SEARCH</button>
            </form>
            <hr className={styles.divider}/>
            <div className={styles.charactersGrid}>
                {characters.map(character => {
                    return <CharacterCard id={character.id} image={character.image} name={character.name}
                                          desc={character.desc}/>
                })}
                {characters.map(character => {
                    return <CharacterCard id={character.id} image={character.image} name={character.name}
                                          desc={character.desc}/>
                })}
                {characters.map(character => {
                    return <CharacterCard id={character.id} image={character.image} name={character.name}
                                          desc={character.desc}/>
                })}
            </div>
        </section>
    )
};

export default Characters;
