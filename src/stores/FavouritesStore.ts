import {makeAutoObservable, reaction} from "mobx";
import {LocalStorageEntity} from "../types/LocalStorageEntity.tsx";

class FavouritesStore{
    favourites: LocalStorageEntity[] = [];

    constructor() {
        makeAutoObservable(this);
        reaction(
            () => this.favourites,
            () => this.setFavouritesAmount()
        )
    }

    setFavouritesAmount = () => {
        this.setFavourites(JSON.parse(localStorage.getItem("favourites")));
    }

    setFavourites = (favourites: LocalStorageEntity[]) => {
        this.favourites = favourites;
    }
}

export const favouritesStore = new FavouritesStore();
export default favouritesStore;