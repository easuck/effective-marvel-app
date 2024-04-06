import React, {FC, useEffect} from "react";
import Card from "../../components/card/Card.tsx";
import styles from "./styles.module.css"
import {LocalStorageEntity} from "../../types/LocalStorageEntity.tsx";
import favouritesStore from "../../stores/FavouritesStore.ts";
import {observer} from "mobx-react-lite";

const Favourites: FC = observer(() => {
    const {favouritesAmount} = favouritesStore;

    useEffect(() => {
        favouritesStore.setFavouritesAmount(localStorage.length);
    }, []);

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
                                 desc={item.desc} link={item.type}
                                 favouritesAmount={favouritesAmount} setFavouritesAmount={favouritesStore.setFavouritesAmount}/>
                })}
            </div>
        </section>
    )
});

export default Favourites;