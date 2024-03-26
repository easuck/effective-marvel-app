import {ICharacter} from "../types/ICharacter.tsx";
import {makeAutoObservable} from "mobx";

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
}

export const characterInfoStore = new CharacterInfoStore();