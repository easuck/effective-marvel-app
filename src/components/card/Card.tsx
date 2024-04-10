import {FC, useEffect, useState} from "react";
import styles from "./styles.module.css"
import {Link} from "react-router-dom";
import {AiFillHeart, AiOutlineHeart} from "react-icons/ai";
import {IconContext} from "react-icons";
import useLocalStorage from "../../hooks/useLocalStorage.ts";
import favouritesStore from "../../stores/FavouritesStore.ts";
import {LocalStorageEntity} from "../../types/LocalStorageEntity.tsx";

const Card: FC<{id: number, image: string, name: string, desc: string, link: string}> =
    ({id, image, name, desc, link}) => {
    const [isFavourite, setIsFavourite] = useState<boolean>(false);
    const [isMouseOver, setIsMouseOver] = useState<boolean>(false);
    const {favouritesAmount, favourites} = favouritesStore;
    const {getItem, setItem, removeItem} = useLocalStorage(favouritesStore.setFavouritesAmount, favouritesAmount);

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
                         //favouritesStore.setFavourites() не знаю как через сеттер присвоить массив
                         favourites.push(newFavourite);
                         setItem("favourites", favourites)
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