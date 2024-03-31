import axios from "./axios.ts";
import {IComics} from "../types/IComics.tsx";
import comicsStore from "../stores/ComicsStore.ts";
import comicsInfoStore from "../stores/ComicsInfoStore.ts";
import {DataContainer} from "../types/CharacterDataContainer.tsx";

export default{
    async getComics(limit: number, offset: number): Promise<DataContainer>{
        try{
            comicsStore.setLoading(true);
            const response = await axios.get("/comics", {params: {limit: limit, offset: offset}});
            comicsStore.setLoading(false);
            return response.data.data;
        }
        catch {}
    },

    async getComicsById(id: number): Promise<DataContainer>{
        try{
            comicsInfoStore.setLoading(true);
            const response = await axios.get("/comics/" + id);
            comicsInfoStore.setLoading(false);
            return response.data.data;
        }
        catch {}
    },

    async getComicsByTitle(limit: number, title: string): Promise<DataContainer>{
        try{
            const response = await axios.get("/comics", {params: {limit: limit, titleStartsWith: title}});
            return response.data.data;
        }
        catch {}
    }
}