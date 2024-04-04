import {makeAutoObservable} from "mobx";

class FavouritesStore{
    favouritesAmount: number = 0;

    constructor() {
        makeAutoObservable(this);
    }

    setFavouritesAmount = (favouritesAmount: number) => {
        this.favouritesAmount = favouritesAmount;
    }
}

export const favouritesStore = new FavouritesStore();
export default favouritesStore;