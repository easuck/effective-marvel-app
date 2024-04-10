import {FC, useEffect, useState} from "react";
import styles from "./styles.module.css"
import {Link} from "react-router-dom";
import {AiFillHeart, AiOutlineHeart} from "react-icons/ai";
import {IconContext} from "react-icons";
import favouritesStore from "../../stores/FavouritesStore.ts";
import {LocalStorageEntity} from "../../types/LocalStorageEntity.tsx";
import localStorageInteraction from "../../helpers/localStorageInteraction.ts";

const Card: FC<{id: number, image: string, name: string, desc: string, link: string}> =
    ({id, image, name, desc, link}) => {
    const [isFavourite, setIsFavourite] = useState<boolean>(false);
    const [isMouseOver, setIsMouseOver] = useState<boolean>(false);
    const {favourites} = favouritesStore;
    const {getItem, setItem, removeItem} = localStorageInteraction;

    useEffect(() => {
        if (getItem("favourites")?.find(item => item.id == id)){
            setIsFavourite(true);
        }
    }, []);

    const onMouseEnter = () => {
        setIsMouseOver(true);
    }

    const onMouseLeave = () => {
        setIsMouseOver(false);
    }

    const changeFavourite = () => {
        setIsFavourite(prev => !prev);
    }

    return(
        <div className={styles.card} onMouseEnter={() => onMouseEnter()} onMouseLeave={() => onMouseLeave()}>
            <div className={isMouseOver ? styles.favourite : styles.favouriteHidden}
                 onClick={() => {
                     if (isFavourite) {
                         removeItem("favourites", id.toString());
                     }
                     else {
                         const newFavourite: LocalStorageEntity = {id: id, image: image, name: name, desc: desc, type: link};
                         let newFavourites: LocalStorageEntity[] = JSON.parse(localStorage.getItem("favourites"));
                         newFavourites = [...newFavourites, newFavourite];
                         favouritesStore.setFavourites(newFavourites);
                         setItem("favourites", newFavourites)
                     }
                     changeFavourite();
                 }}>
                <IconContext.Provider value={{size: "40px", color: "red"}}>
                    {isFavourite ? <AiFillHeart/> : <AiOutlineHeart/>}
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
}

export default Card;