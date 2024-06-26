import {IComics} from "./IComics.tsx";

export interface ICharacter{
    id: number,
    image: string,
    name: string,
    desc: string,
    comics: IComics[];
}