import {makeAutoObservable} from "mobx";
import {LocalStorageEntity} from "../types/LocalStorageEntity.tsx";

class FavouritesStore{
    favourites: LocalStorageEntity[] = JSON.parse(localStorage.getItem("favourites")) || [];

    constructor() {
        makeAutoObservable(this);
    }

    setFavourites = (favourites: LocalStorageEntity[]) => {
        this.favourites = favourites;
    }
}

export const favouritesStore = new FavouritesStore();
export default favouritesStore;