import {ICharacter} from "../types/ICharacter.tsx";
import {IComics} from "../types/IComics.tsx";
import {makeAutoObservable} from "mobx";

class CharacterInfoStore {
    character: ICharacter[] = [];
    comics: IComics[] = [];
    loading: boolean = false;

    constructor() {
        makeAutoObservable(this);
    }

    setCharacter = (character: ICharacter[]) => {
        this.character = character;
    }

    setComics = (comics: IComics[]) => {
        this.comics = comics;
    }

    setLoading = (loading: boolean) => {
        this.loading = loading;
    }
}

export const characterInfoStore = new CharacterInfoStore();