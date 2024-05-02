import {IComics} from "../types/IComics.tsx";
import {makeAutoObservable} from "mobx";
import api from "../api/index.ts";

class ComicsStore {
    comics: IComics[] = [];
    inputValue: string = "";
    searchValue: string = "";
    page: number = 1;
    comicsAmount: number = null;
    comicsOnPage: number = 36;
    loading: boolean = false;

    constructor() {
        makeAutoObservable(this);
    }

    setComics = (comics: IComics[]) => {
        this.comics = comics;
    }

    setInputValue = (inputValue: string) => {
        this.inputValue = inputValue;
    }

    setSearchValue = (searchValue: string) => {
        this.searchValue = searchValue;
    }


    setPage = (page: number) => {
        this.page = page;
    }

    setComicsAmount = (comicsAmount: number) => {
        this.comicsAmount = comicsAmount;
    }

    setLoading = (loading: boolean) => {
        this.loading = loading;
    }

    addNextComics = () => {
        this.setLoading(true);
        api.comicsRequests.getComics(this.comicsOnPage, (this.page - 1) * this.comicsOnPage)
            .then(data => {
                const comicsArray: IComics[] = data.results.map(comics => {
                    return {
                        id: comics.id,
                        title: comics.title,
                        desc: comics.description,
                        image: comics.thumbnail.path + "." + comics.thumbnail.extension
                    }
                })
                this.setComics(this.comics.concat(comicsArray));
                this.setLoading(false);
            })
    }

    addNextComicsByTitle = () => {
        this.setLoading(true);
        api.comicsRequests.getComicsByTitle(this.comicsOnPage, (this.page - 1) * this.comicsOnPage, this.searchValue)
            .then(data => {
                const comicsArray: IComics[]  = data.results.map(comics => {
                    return {
                        id: comics.id,
                        title: comics.title,
                        desc: comics.description,
                        image: comics.thumbnail.path + "." + comics.thumbnail.extension
                    }
                })
                this.setComics(this.comics.concat(comicsArray));
                this.setLoading(false);
            })
    }

    searchComics = () => {
        this.setPage(1);
        this.setSearchValue("");
        this.setComics([]);
        this.setLoading(true);
        api.comicsRequests.getComics(this.comicsOnPage, (this.page - 1) * this.comicsOnPage)
            .then(data => {
                const comicsArray: IComics[] = data.results.map(comics => {
                    return {
                        id: comics.id,
                        title: comics.title,
                        desc: comics.description,
                        image: comics.thumbnail.path + "." + comics.thumbnail.extension
                    }
                })
                this.setComics(comicsArray);
                this.setComicsAmount(data.total);
                this.setLoading(false);
            })
    }

    searchComicsByTitle = () => {
        this.setPage(1);
        this.setSearchValue(this.inputValue);
        this.setComics([]);
        this.setLoading(true);
        api.comicsRequests.getComicsByTitle(this.comicsOnPage, (this.page - 1) * this.comicsOnPage, this.searchValue)
            .then(data => {
                const comicsArray: IComics[]  = data.results.map(comics => {
                    return {
                        id: comics.id,
                        title: comics.title,
                        desc: comics.description,
                        image: comics.thumbnail.path + "." + comics.thumbnail.extension
                    }
                })
                this.setComics(comicsArray);
                this.setComicsAmount(data.total);
                this.setLoading(false);
            })
    }
}

export const comicsStore = new ComicsStore();