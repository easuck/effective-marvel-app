import React, {FC, useEffect} from "react";
import Card from "../../components/card/Card.tsx";
import styles from "./styles.module.css"
import {observer} from "mobx-react-lite";
import favouritesStore from "../../stores/FavouritesStore.ts";

const Favourites: FC = observer(() => {
    useEffect(() => {
        favouritesStore.setFavouritesAmount(); //метод дублирует функционал при изменении массива(?)
    }, []);

    return (
        <section className={styles.favourites}>
            <div className={styles.labelWrapper}>
                <h3 className={styles.labelFavourites}>Favourites</h3>
                <h3 className={styles.labelAmount}>({favouritesStore.favourites.length})</h3>
            </div>
            <hr className={styles.divider}/>
            <div className={styles.favouritesGrid}>
                {JSON.parse(localStorage.getItem("favourites"))?.map((item) => {
                    return <Card key={item.id} id={item.id} image={item.image}
                                 name={item.name}
                                 desc={item.desc} link={item.type}/>
                })}
            </div>
        </section>
    )
});

export default Favourites;