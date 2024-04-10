import {LocalStorageEntity} from "../types/LocalStorageEntity.tsx";
import favouritesStore from "../stores/FavouritesStore.ts";

const useLocalStorage = (setFavouritesAmount: (amount: number) => void, favouritesAmount: number) => {
    const setItem = (key: string, value: unknown) => {
        localStorage.setItem(key, JSON.stringify(value));
        setFavouritesAmount(favouritesAmount + 1);
    }

    const getItem = (key: string) => {
        const value = localStorage.getItem(key);
        return value ? JSON.parse(value) : undefined;
    }

    const removeItem = (key: string, id: string) => {
        const newFavourites: LocalStorageEntity[] = getItem(key).filter(item => item.id != id);
        setItem("favourites", newFavourites);
        favouritesStore.setFavourites(newFavourites);
        setFavouritesAmount(favouritesAmount - 1);
    }

    return {setItem, getItem, removeItem};
}

export default useLocalStorage;