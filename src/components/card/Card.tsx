import {FC, useState} from "react";
import styles from "./styles.module.css"
import {Link} from "react-router-dom";
import {AiFillHeart, AiOutlineHeart} from "react-icons/ai";
import {IconContext} from "react-icons";
import favouritesStore from "../../stores/FavouritesStore.ts";
import {LocalStorageEntity} from "../../types/LocalStorageEntity.tsx";
import localStorageInteraction from "../../helpers/localStorageInteraction.ts";
import {observer} from "mobx-react-lite";

const Card: FC<{id: number, image: string, name: string, desc: string, link: string}> =
    observer(({id, image, name, desc, link}) => {
    const [isMouseOver, setIsMouseOver] = useState<boolean>(false);
    const {favourites} = favouritesStore;
    const {getItem, setItem, removeItem} = localStorageInteraction;

    const onMouseEnter = () => {
        setIsMouseOver(true);
    }

    const onMouseLeave = () => {
        setIsMouseOver(false);
    }

    return(
        <div className={styles.card} onMouseEnter={() => onMouseEnter()} onMouseLeave={() => onMouseLeave()}>
            <div className={isMouseOver ? styles.favourite : styles.favouriteHidden}
                 onClick={() => {
                     if (favourites.find(item => item.id == id)) {
                         const newFavourites: LocalStorageEntity[] = getItem("favourites").filter(item => item.id != id);
                         favouritesStore.setFavourites(newFavourites);
                         removeItem("favourites", id.toString());
                     }
                     else {
                         const newFavourite: LocalStorageEntity = {id: id, image: image, name: name, desc: desc, type: link};
                         let newFavourites: LocalStorageEntity[] = JSON.parse(localStorage.getItem("favourites"));
                         newFavourites = [...newFavourites, newFavourite];
                         favouritesStore.setFavourites(newFavourites);
                         setItem("favourites", newFavourites);
                     }
                 }}>
                <IconContext.Provider value={{size: "40px", color: "red"}}>
                    {favourites.find(item => item.id == id) ? <AiFillHeart/> : <AiOutlineHeart/>}
                </IconContext.Provider>
            </div>
            <Link className={styles.link} to={`/${link}/` + id}>
                <img src={image} alt="portrait"/>
            </Link>
            <div className={styles.textWrapper}>
                <h3 className={styles.name}>{name}</h3>
                <p className={styles.desc}>{desc == "" ? "No description" : desc}</p>
            </div>
        </div>
    )
});

export default Card;