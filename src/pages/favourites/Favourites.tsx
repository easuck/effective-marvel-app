import React, {FC, useEffect, useState} from "react";
import Card from "../../components/card/Card.tsx";
import styles from "./styles.module.css"
import {LocalStorageEntity} from "../../types/LocalStorageEntity.tsx";

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
            <div className={styles.labelWrapper}>
                <h3 className={styles.labelFavourites}>Favourites</h3>
                <h3 className={styles.labelAmount}>({favouritesAmount})</h3>
            </div>
            <hr className={styles.divider}/>
            <div className={styles.favouritesGrid}>
                {Object.keys(localStorage).map((key) => {
                    const item: LocalStorageEntity = JSON.parse(localStorage.getItem(key));
                    return <Card key={item.id} id={item.id} image={item.image}
                                 name={item.name}
                                 desc={item.desc} link="characters"
                                 favouritesAmount={favouritesAmount} setFavouritesAmount={setFavouritesAmount}/>
                })}
            </div>
        </section>
    )
}

export default Favourites;