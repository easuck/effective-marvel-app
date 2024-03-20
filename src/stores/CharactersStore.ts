import {ICharacter} from "../types/ICharacter.tsx";
import {makeAutoObservable} from "mobx";

class CharactersStore {
    characters: ICharacter[] = [];
    searchCharacter: string = "";
    page: number = 1;

    constructor(){
        makeAutoObservable(this);
    }

    setCharacters = (characters: ICharacter[]) => {
        this.characters = characters;
    }

    setSearchCharacter = (searchCharacter: string) => {
        this.searchCharacter = searchCharacter;
    }

    setPage = (page: number) => {
        this.page = page;
    }
}

export default CharactersStore;