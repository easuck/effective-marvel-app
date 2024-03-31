import axios from "./axios.ts";
import charactersStore from "../stores/CharactersStore.ts";
import {characterInfoStore} from "../stores/CharacterInfoStore.ts";
import {ICharacter} from "../types/ICharacter.tsx";
import {DataContainer} from "../types/CharacterDataContainer.tsx";

export default{
    async getCharacters(limit: number, offset: number): Promise<DataContainer>{
        try {
            charactersStore.setLoading(true);
            const response = await axios.get("/characters", {params: {limit: limit, offset: offset}})
            charactersStore.setLoading(false);
            return response.data.data;
        }
        catch {}
    },

    async getCharacterById(id: number): Promise<DataContainer>{
        try{
            characterInfoStore.setLoading(true);
            const response = await axios.get(`/characters/${id}`);
            characterInfoStore.setLoading(false);
            return response.data.data;
        }
        catch {}
    },

    async getCharactersByName(limit: number, name: string): Promise<DataContainer>{
        try{
            const response = await axios.get("/characters", {params: {limit: limit, nameStartsWith: name}});
            return response.data.data;
        }
        catch {}
    }
}