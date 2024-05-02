import {ICharacter} from "../types/ICharacter.tsx";
import {makeAutoObservable} from "mobx";
import {IComics} from "../types/IComics.tsx";
import api from "../api/index.ts"

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
        this.setLoading(true);
        api.charactersRequests.getCharacterById(id as unknown as number)
            .then(data => {
                const charactersArray: ICharacter[] = data.results.map(character => {
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
                this.setLoading(false);
            });
    }
}

export const characterInfoStore = new CharacterInfoStore();