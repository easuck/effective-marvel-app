import {ICharacter} from "../types/ICharacter.tsx";
import {makeAutoObservable, reaction} from "mobx";
import api from "../api/index.ts"
import characters from "../pages/characters/Characters.tsx";

class CharactersStore {
    characters: ICharacter[] = [];
    inputValue: string = "";
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

    setSearchCharacter = (searchCharacter: string) => {
        this.inputValue = searchCharacter;
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
                const newCharacters: ICharacter[] = this.characters.concat(charactersArray);
                this.setCharacters(newCharacters);
            })
    }

    searchCharacters = () => {
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
            /*this.setPagesAmount(Math.ceil(this.charactersAmount / this.charactersOnPage));*/
        })
    }

    searchCharactersByName = () => {
        api.charactersRequests.getCharactersByName(this.charactersOnPage, this.inputValue)
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
                /*this.setPagesAmount(Math.ceil(this.charactersAmount / this.charactersOnPage));*/
            })
    }
}


export const charactersStore = new CharactersStore();

export default charactersStore;