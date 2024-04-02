import React, {FC, useEffect, useState} from "react";
import Card from "../../components/card/Card.tsx";
import styles from "./styles.module.css"
import {ICharacter} from "../../types/ICharacter.tsx";

const Favourites: FC = () => {
    const [favouritesAmount, setFavouritesAmount] = useState<number>(0);

    useEffect(() => {
        Object.keys(localStorage).forEach(() => {
            setFavouritesAmount(prev => prev + 1);
        })
    }, []);

    useEffect(() => {
        //просто useEffect для ререндера. так вообще можно? 
    }, [favouritesAmount]);

    return (
        <section className={styles.favourites}>
            <div>Количество элементов в избранном: {favouritesAmount}</div>
            <div className={styles.favouritesGrid}>
                {Object.keys(localStorage).map((key) => {
                    const character: ICharacter = JSON.parse(localStorage.getItem(key));
                    return <Card key={character.id} id={character.id} image={character.image}
                                 name={character.name}
                                 desc={character.desc} link="characters"
                                 favouritesAmount={favouritesAmount} setFavouritesAmount={setFavouritesAmount}/>
                })}
            </div>
        </section>
    )
}

export default Favourites;