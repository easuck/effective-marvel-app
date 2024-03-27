import {ICharacter} from "./ICharacter.tsx";

export interface IComics{
    id: number,
    image: string,
    title: string,
    desc: string,
    characters: ICharacter[]
}