import axios from "./axios.ts";
import {DataContainer} from "../types/CharacterDataContainer.tsx";

export default{
    async getComics(limit: number, offset: number): Promise<DataContainer>{
        try{
            const response = await axios.get("/comics", {params: {limit: limit, offset: offset}});
            return response.data.data;
        }
        catch {}
    },

    async getComicsById(id: number): Promise<DataContainer>{
        try{
            const response = await axios.get("/comics/" + id);
            return response.data.data;
        }
        catch {}
    },

    async getComicsByTitle(limit: number, offset: number, title: string): Promise<DataContainer>{
        try{
            const response = await axios.get("/comics", {params: {limit: limit, offset: offset, titleStartsWith: title}});
            return response.data.data;
        }
        catch {}
    }
}