import {FC} from "react";
import styles from "./styles.module.css"
import CharacterCard from "./card/characterCard.tsx";

const Characters: FC = () => {
    let charactersAmount: number = 1562;

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
                <CharacterCard image="../../../public/spider_man.jpeg" name="Spider-man"
                               desc="Spider-man (Bully Maguire) Spider-man (Bully Maguire)"/>
                <CharacterCard image="../../../public/spider_man.jpeg" name="Spider-man"
                               desc="Spider-man (Bully Maguire) Spider-man (Bully Maguire)"/>
                <CharacterCard image="../../../public/spider_man.jpeg" name="Spider-man"
                               desc="Spider-man (Bully Maguire) Spider-man (Bully Maguire)"/>
                <CharacterCard image="../../../public/spider_man.jpeg" name="Spider-man"
                               desc="Spider-man (Bully Maguire) Spider-man (Bully Maguire)"/>
                <CharacterCard image="../../../public/spider_man.jpeg" name="Spider-man"
                               desc="Spider-man (Bully Maguire) Spider-man (Bully Maguire)"/>
                <CharacterCard image="../../../public/spider_man.jpeg" name="Spider-man"
                               desc="Spider-man (Bully Maguire) Spider-man (Bully Maguire)"/>
                <CharacterCard image="../../../public/spider_man.jpeg" name="Spider-man"
                               desc="Spider-man (Bully Maguire) Spider-man (Bully Maguire)"/>
                <CharacterCard image="../../../public/spider_man.jpeg" name="Spider-man"
                               desc="Spider-man (Bully Maguire) Spider-man (Bully Maguire)"/>
                <CharacterCard image="../../../public/spider_man.jpeg" name="Spider-man"
                               desc="Spider-man (Bully Maguire) Spider-man (Bully Maguire)"/>
                <CharacterCard image="../../../public/spider_man.jpeg" name="Spider-man"
                               desc="Spider-man (Bully Maguire) Spider-man (Bully Maguire)"/>
                <CharacterCard image="../../../public/spider_man.jpeg" name="Spider-man"
                               desc="Spider-man (Bully Maguire) Spider-man (Bully Maguire)"/>
                <CharacterCard image="../../../public/spider_man.jpeg" name="Spider-man"
                               desc="Spider-man (Bully Maguire) Spider-man (Bully Maguire)"/>
            </div>
        </section>
    )
};

export default Characters;
