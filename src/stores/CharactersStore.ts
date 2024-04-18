import {ICharacter} from "../types/ICharacter.tsx";
import {makeAutoObservable} from "mobx";
import api from "../api/index.ts"

class CharactersStore {
    characters: ICharacter[] = [];
    inputValue: string = "";
    searchValue: string = "";
    page: number = 1;
    loading: boolean = false;
    charactersAmount: number = 0;
    charactersOnPage : number = 36;

    constructor(){
        makeAutoObservable(this);
    }

    setCharacters = (characters: ICharacter[]) => {
        this.characters = characters;
    }

    setInputValue = (searchCharacter: string) => {
        this.inputValue = searchCharacter;
    }

    setSearchValue = (searchWord: string) => {
        this.searchValue = searchWord;
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

    addNextCharacters = () => {
        api.charactersRequests.getCharactersWithoutLoad(this.charactersOnPage, (this.page - 1) * this.charactersOnPage)
            .then(data => {
                const charactersArray: ICharacter[]  = data.results.map(character => {
                    return {
                        id: character.id,
                        name: character.name,
                        desc: character.description,
                        image: character.thumbnail.path + "." + character.thumbnail.extension
                    }
                })
                this.setCharacters(this.characters.concat(charactersArray));
            })
    }

    addNextCharactersByName = () => {
        api.charactersRequests.getCharactersByNameWithoutLoad(this.charactersOnPage, (this.page - 1) * this.charactersOnPage, this.searchValue)
            .then(data => {
                const charactersArray: ICharacter[]  = data.results.map(character => {
                    return {
                        id: character.id,
                        name: character.name,
                        desc: character.description,
                        image: character.thumbnail.path + "." + character.thumbnail.extension
                    }
                })
                this.setCharacters(this.characters.concat(charactersArray));
            })
    }

    searchCharacters = () => {
        this.setPage(1);
        this.setSearchValue("");
        api.charactersRequests.getCharacters(this.charactersOnPage, (this.page - 1) * this.charactersOnPage)
        .then(data => {
            const charactersArray: ICharacter[]  = data.results.map(character => {
                return {
                    id: character.id,
                    name: character.name,
                    desc: character.description,
                    image: character.thumbnail.path + "." + character.thumbnail.extension
                }
            })
            this.setCharacters(charactersArray);
            this.setCharactersAmount(data.total);
        })
    }

    searchCharactersByName = () => {
        this.setPage(1);
        this.setSearchValue(this.inputValue);
        api.charactersRequests.getCharactersByName(this.charactersOnPage, (this.page - 1) * this.charactersOnPage, this.inputValue)
            .then(data => {
                const charactersArray: ICharacter[]  = data.results.map(character => {
                    return {
                        id: character.id,
                        name: character.name,
                        desc: character.description,
                        image: character.thumbnail.path + "." + character.thumbnail.extension
                    }
                })
                this.setCharacters(charactersArray);
                this.setCharactersAmount(data.total);
            })
    }
}


export const charactersStore = new CharactersStore();

export default charactersStore;