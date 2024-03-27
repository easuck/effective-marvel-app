import axios from "./axios.ts";
import charactersStore from "../stores/CharactersStore.ts";
import {characterInfoStore} from "../stores/CharacterInfoStore.ts";
import {ICharacter} from "../types/ICharacter.tsx";

export default{
    async getCharacters(limit: number, offset: number): Promise<ICharacter[]>{
        try {
            charactersStore.setLoading(true);
            console.log("загрузка началась")
            const response = await axios.get("/characters", {params: {limit: limit, offset: offset}})
            charactersStore.setLoading(false);
            console.log("загрузка закончилась")
            return [response.data.data.results, response.data.data];
        }
        catch {}
    },

    async getCharacterById(id: number): Promise<ICharacter>{
        try{
            characterInfoStore.setLoading(true);
            console.log("загрузка началась")
            const response = await axios.get(`/characters/${id}`);
            characterInfoStore.setLoading(false);
            console.log("загрузка закончилась")
            return response.data.data.results;
        }
        catch {}
    },

    async searchCharacterByName(limit: number, name: string): Promise<ICharacter[]>{
        try{
            const response = await axios.get("/characters", {params: {limit: limit, nameStartsWith: name}});
            return response.data.data.results;
        }
        catch {}
    }
}