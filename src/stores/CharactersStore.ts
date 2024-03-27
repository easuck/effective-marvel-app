import {ICharacter} from "../types/ICharacter.tsx";
import {makeAutoObservable} from "mobx";

class CharactersStore {
    characters: ICharacter[] = [];
    searchCharacter: string = "";
    page: number = 1;
    loading: boolean = false;
    charactersAmount: number = 0;
    pagesAmount: number = 0;

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

    setLoading = (loading: boolean) => {
        this.loading = loading;
    }

    setCharactersAmount = (charactersAmount: number) => {
        this.charactersAmount = charactersAmount;
    }

    setPagesAmount = (pagesAmount: number) => {
        this.pagesAmount = pagesAmount;
    }
}

export const charactersStore = new CharactersStore();

export default charactersStore;