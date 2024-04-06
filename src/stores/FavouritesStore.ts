import {makeAutoObservable, reaction} from "mobx";

class FavouritesStore{
    favouritesAmount: number = 0;

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
}

export const favouritesStore = new FavouritesStore();
export default favouritesStore;