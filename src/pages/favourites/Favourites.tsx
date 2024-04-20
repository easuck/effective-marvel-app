import React, {FC} from "react";
import Card from "../../components/card/Card.tsx";
import styles from "./styles.module.css"
import {observer} from "mobx-react-lite";
import favouritesStore from "../../stores/FavouritesStore.ts";
import {VirtuosoGrid} from "react-virtuoso";

const Favourites: FC = observer(() => {
    const {favourites} = favouritesStore;

    return (
        <section className={styles.favourites}>
            <div className={styles.labelWrapper}>
                <h3 className={styles.labelFavourites}>Favourites</h3>
                <h3 className={styles.labelAmount}>({favouritesStore.favourites.length})</h3>
            </div>
            <hr className={styles.divider}/>
            <VirtuosoGrid
                listClassName={styles.favouritesGrid}
                useWindowScroll={true}
                totalCount={favourites.length}
                itemContent={(index) => <Card key={favourites[index].id} id={favourites[index].id} image={favourites[index].image}
                                              name={favourites[index].name}
                                              desc={favourites[index].desc} link={favourites[index].type}/>}
            />
        </section>
    )
});

export default Favourites;