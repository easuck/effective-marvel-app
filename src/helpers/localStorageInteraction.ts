import favouritesStore from "../stores/FavouritesStore.ts";
import {LocalStorageEntity} from "../types/LocalStorageEntity.tsx";

const localStorageInteraction = () => {
    const setItem = (key: string, value: unknown) => {
        localStorage.setItem(key, JSON.stringify(value));
        favouritesStore.setFavourites(value as LocalStorageEntity[]);
    }

    const getItem = (key: string) => {
        const value = localStorage.getItem(key);
        return value ? JSON.parse(value) : undefined;
    }

    const removeItem = (key: string, id: string) => {
        const newFavourites: LocalStorageEntity[] = getItem(key).filter(item => item.id != id);
        setItem("favourites", newFavourites);
        favouritesStore.setFavourites(newFavourites);
    }

    return {setItem, getItem, removeItem};
}

export default localStorageInteraction();
