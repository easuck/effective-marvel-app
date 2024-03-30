import {ICharacter} from "../types/ICharacter.tsx";
import {makeAutoObservable, reaction} from "mobx";
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
        reaction(
            () => this.page,
            (page) => {
                this.searchCharacters();
            }
        )
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

    searchCharacters = () => {
        charactersRequests.getCharacters(this.charactersOnPage, (this.page - 1) * this.charactersOnPage)
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

    searchCharactersByName = () => {
        charactersRequests.getCharactersByName(this.charactersOnPage, this.searchCharacter)
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
}


export const charactersStore = new CharactersStore();

export default charactersStore;