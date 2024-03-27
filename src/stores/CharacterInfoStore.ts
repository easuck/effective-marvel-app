import {ICharacter} from "../types/ICharacter.tsx";
import {makeAutoObservable} from "mobx";
import charactersRequests from "../api/charactersRequests.ts";
import {IComics} from "../types/IComics.tsx";

class CharacterInfoStore {
    character: ICharacter[] = [];
    loading: boolean = false;

    constructor() {
        makeAutoObservable(this);
    }

    setCharacter = (character: ICharacter[]) => {
        this.character = character;
    }

    setLoading = (loading: boolean) => {
        this.loading = loading;
    }

    getCharacterById = (id: string) => {
        charactersRequests.getCharacterById(id as unknown as number)
            .then(data => {
                const charactersArray: ICharacter[] = data.data.results.map(character => {
                    const comicsArray: IComics[] = character.comics.items.map(comics => {
                        return {
                            id: comics.resourceURI.split('/').slice(-1).toString(),
                            title: comics.name
                        }
                    })
                    return {
                        id: character.id,
                        name: character.name,
                        desc: character.description,
                        image: character.thumbnail.path + "." + character.thumbnail.extension,
                        comics: comicsArray
                    }
                })
                this.setCharacter(charactersArray);
            });
    }
}

export const characterInfoStore = new CharacterInfoStore();
export  default characterInfoStore;