import React, {FC} from "react";
import Card from "../../components/card/Card.tsx";
import styles from "./styles.module.css"
import {observer} from "mobx-react-lite";
import favouritesStore from "../../stores/FavouritesStore.ts";

const Favourites: FC = observer(() => {
    const {favourites} = favouritesStore;

    return (
        <section className={styles.favourites}>
            <div className={styles.labelWrapper}>
                <h3 className={styles.labelFavourites}>Favourites</h3>
                <h3 className={styles.labelAmount}>({favouritesStore.favourites.length})</h3>
            </div>
            <hr className={styles.divider}/>
            <div className={styles.favouritesGrid}>
                {favourites.map((item) => {
                    return <Card key={item.id} id={item.id} image={item.image}
                                 name={item.name}
                                 desc={item.desc} link={item.type}/>
                })}
            </div>
        </section>
    )
});

export default Favourites;