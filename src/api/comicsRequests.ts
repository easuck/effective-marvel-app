import axios from "./axios.ts";
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

    async getComicsWithoutLoad(limit: number, offset: number): Promise<DataContainer>{
        try{
            const response = await axios.get("/comics", {params: {limit: limit, offset: offset}});
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

    async getComicsByTitle(limit: number, offset: number, title: string): Promise<DataContainer>{
        try{
            const response = await axios.get("/comics", {params: {limit: limit, offset: offset, titleStartsWith: title}});
            return response.data.data;
        }
        catch {}
    },

    async getComicsByTitleWithoutLoad(limit: number, offset: number, title: string): Promise<DataContainer>{
        try{
            const response = await axios.get("/comics", {params: {limit: limit, offset: offset, titleStartsWith: title}});
            return response.data.data;
        }
        catch {}
    }
}