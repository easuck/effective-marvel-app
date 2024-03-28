import {IComics} from "../types/IComics.tsx";
import {makeAutoObservable} from "mobx";
import comicsRequests from "../api/comicsRequests.ts";

class ComicsStore {
    comics: IComics[] = [];
    inputValue: string = "";
    page: number = 1;
    pagesAmount: number = 0;
    comicsAmount: number = 0;
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

    setPage = (page: number) => {
        this.page = page;
    }

    setPagesAmount = (pagesAmount: number) => {
        this.pagesAmount = pagesAmount;
    }

    setComicsAmount = (comicsAmount: number) => {
        this.comicsAmount = comicsAmount;
    }

    setLoading = (loading: boolean) => {
        this.loading = loading;
    }

    searchComics = () => {
        comicsRequests.getComics(this.comicsOnPage, (this.page - 1) * this.comicsOnPage)
            .then(data => {
                const comicsArray: IComics[] = data.data.results.map(comics => {
                    return {
                        id: comics.id,
                        title: comics.title,
                        desc: comics.description,
                        image: comics.thumbnail.path + "." + comics.thumbnail.extension
                    }
                })
                this.setComics(comicsArray);
                this.setComicsAmount(data.data.total);
                this.setPagesAmount(Math.ceil(this.comicsAmount / this.comicsOnPage));
            })
    }

    /*searchComicsByTitle(event: any): void;
    searchComicsByTitle(): void;*/
    //почему-то не работает 0_о

    searchComicsByTitle = (event: any /*event?: any*/) => {
        //if (event) event.preventDefault();
        event.preventDefault();
        comicsRequests.getComicsByTitle(this.comicsOnPage, this.inputValue)
            .then(data => {
                const comicsArray: IComics[]  = data.data.results.map(comics => {
                    return {
                        id: comics.id,
                        title: comics.title,
                        desc: comics.description,
                        image: comics.thumbnail.path + "." + comics.thumbnail.extension
                    }
                })
                this.setComics(comicsArray);
                this.setComicsAmount(data.data.total);
                this.setPagesAmount(Math.ceil(this.comicsAmount / this.comicsOnPage));
            })
    }

    searchComicsByTitleDebounce = () => {
        comicsRequests.getComicsByTitle(this.comicsOnPage, this.inputValue)
            .then(data => {
                const comicsArray: IComics[]  = data.data.results.map(comics => {
                    return {
                        id: comics.id,
                        title: comics.title,
                        desc: comics.description,
                        image: comics.thumbnail.path + "." + comics.thumbnail.extension
                    }
                })
                this.setComics(comicsArray);
                this.setComicsAmount(data.data.total);
                this.setPagesAmount(Math.ceil(this.comicsAmount / this.comicsOnPage));
            })
    }
}

export const comicsStore = new ComicsStore();

export default comicsStore;