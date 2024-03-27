import {ICharacter} from "../types/ICharacter.tsx";
import {makeAutoObservable} from "mobx";
import charactersRequests from "../api/charactersRequests.ts";

class CharactersStore {
    characters: ICharacter[] = [];
    searchCharacter: string = "";
    page: number = 1;
    loading: boolean = false;
    charactersAmount: number = 0;
    pagesAmount: number = 0;
    charactersOnPage : number = 36;

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

    searchCharacters = (offset: number) => {
        charactersRequests.getCharacters(this.charactersOnPage, offset)
        .then(data => {
            const charactersArray: ICharacter[]  = data.data.results.map(character => {
                return {
                    id: character.id,
                    name: character.name,
                    desc: character.description,
                    image: character.thumbnail.path + "." + character.thumbnail.extension
                }
            })
            this.setCharacters(charactersArray);
            this.setCharactersAmount(data.data.total);
            this.setPagesAmount(Math.ceil(this.charactersAmount / this.charactersOnPage));
        })
    }

    searchCharactersByName = (event: any) => {
        event.preventDefault();
        charactersRequests.searchCharacterByName(this.charactersOnPage, this.searchCharacter)
            .then(data => {
                const charactersArray: ICharacter[]  = data.data.results.map(character => {
                    return {
                        id: character.id,
                        name: character.name,
                        desc: character.description,
                        image: character.thumbnail.path + "." + character.thumbnail.extension
                    }
                })
                this.setCharacters(charactersArray);
            })
    }

    searchCharactersByNameDebounce = () => {
        charactersRequests.searchCharacterByName(this.charactersOnPage, this.searchCharacter)
            .then(data => {
                const charactersArray: ICharacter[]  = data.data.results.map(character => {
                    return {
                        id: character.id,
                        name: character.name,
                        desc: character.description,
                        image: character.thumbnail.path + "." + character.thumbnail.extension
                    }
                })
                this.setCharacters(charactersArray);
            })
    }
}


export const charactersStore = new CharactersStore();

export default charactersStore;