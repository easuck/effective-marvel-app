import {ICharacter} from "../types/ICharacter.tsx";

export const characters: ICharacter[] = [
    {
        id: 0,
        image: "/spider_man.jpg",
        name: "Spider-man",
        desc: "This is spider-man. He's cool",
        comics: [0, 1, 3]
    },
    {
        id: 1,
        image: "/venom.jpg",
        name: "Venom",
        desc: "This is venom. He's cool",
        comics: [1]
    },
    {
        id: 2,
        image: "/thor.jpeg",
        name: "Thor",
        desc: "This is Thor. He's cool",
        comics: [2]
    },
    {
        id: 3,
        image: "/hulk.jpg",
        name: "Hulk",
        desc: "This is hulk. He's cool",
        comics: [3]
    }
]