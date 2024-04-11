import {IComics} from "../types/IComics.tsx";
import {makeAutoObservable} from "mobx";
import {ICharacter} from "../types/ICharacter.tsx";
import api from "../api/index.ts";

class ComicsInfoStore{
    comics: IComics[] = [];
    loading: boolean = false;

    constructor(){
        makeAutoObservable(this);
    }

    setComics = (comics: IComics[]) => {
        this.comics = comics;
    }

    setLoading = (loading: boolean) => {
        this.loading = loading;
    }

    getComicsById = (id: string) => {
        api.comicsRequests.getComicsById(id as unknown as number)
            .then(data => {
                const comicsArray = data.results.map(comics => {
                    const charactersArray: ICharacter[] = comics.characters.items.map(character => {
                        return {
                            id: character.resourceURI.split('/').slice(-1).toString(),
                            name: character.name
                        }
                    })
                    return {
                        id: comics.id,
                        title: comics.title,
                        desc: comics.description,
                        image: comics.thumbnail.path + "." + comics.thumbnail.extension,
                        characters: charactersArray
                    }
                })
                this.setComics(comicsArray);
            })
    }
}

export const comicsInfoStore = new ComicsInfoStore();
export default comicsInfoStore;