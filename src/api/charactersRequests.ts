import axios from "./axios.ts";
import {DataContainer} from "../types/CharacterDataContainer.tsx";

export default{
    async getCharacters(limit: number, offset: number): Promise<DataContainer>{
        try {
            const response = await axios.get("/characters", {params: {limit: limit, offset: offset}})
            return response.data.data;
        }
        catch {}
    },

    async getCharactersWithoutLoad(limit: number, offset: number): Promise<DataContainer>{
        try{
            const response = await axios.get("/characters", {params: {limit: limit, offset: offset}})
            return response.data.data;
        }
        catch {}
    },

    async getCharacterById(id: number): Promise<DataContainer>{
        try{
            const response = await axios.get(`/characters/${id}`);
            return response.data.data;
        }
        catch {}
    },

    async getCharactersByName(limit: number, offset: number, name: string): Promise<DataContainer>{
        try{
            const response = await axios.get("/characters", {params: {limit: limit, offset: offset, nameStartsWith: name}});
            return response.data.data;
        }
        catch {}
    },

    async getCharactersByNameWithoutLoad(limit: number, offset: number, name: string): Promise<DataContainer>{
        try{
            const response = await axios.get("/characters", {params: {limit: limit, offset: offset, nameStartsWith: name}});
            return response.data.data;
        }
        catch {}
    }
}