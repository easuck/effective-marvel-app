import React, {FC} from "react";
import Card from "../../components/card/Card.tsx";
import styles from "./styles.module.css"
import {ICharacter} from "../../types/ICharacter.tsx";

const Favourites: FC = () => {
    return (
        <section className={styles.favourites}>
            <div className={styles.favouritesGrid}>
                {Object.keys(localStorage).map((key) => {
                    const character: ICharacter = JSON.parse(localStorage.getItem(key));
                    return <Card key={character.id} id={character.id} image={character.image}
                                 name={character.name}
                                 desc={character.desc} link="characters"/>
                })}
            </div>
        </section>
    )
}

export default Favourites;