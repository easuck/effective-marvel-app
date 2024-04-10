import {makeAutoObservable, reaction} from "mobx";
import {LocalStorageEntity} from "../types/LocalStorageEntity.tsx";

class FavouritesStore{
    favouritesAmount: number = 0;
    favourites: LocalStorageEntity[] = [];

    constructor() {
        makeAutoObservable(this);
        reaction(
            () => this.favouritesAmount,
            (favouritesAmount) => {
                this.setFavouritesAmount(localStorage.length);
            }
        )
    }

    setFavouritesAmount = (favouritesAmount: number) => {
        this.favouritesAmount = favouritesAmount;
    }

    setFavourites = (favourites: LocalStorageEntity[]) => {
        this.favourites = favourites;
    }
}

export const favouritesStore = new FavouritesStore();
export default favouritesStore;