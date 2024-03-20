import {IComics} from "../types/IComics.tsx";
import {makeAutoObservable} from "mobx";

class ComicsStore {
    comics: IComics[] = [];
    searchComics: string = "";
    page: number = 1;

    constructor() {
        makeAutoObservable(this);
    }

    setComics = (comics: IComics[]) => {
        this.comics = comics;
    }

    setSearchComics = (searchComics: string) => {
        this.searchComics = searchComics;
    }

    setPage = (page: number) => {
        this.page = page;
    }
}

export default ComicsStore;