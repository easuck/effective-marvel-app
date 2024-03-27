import axios from "./axios.ts";
import {IComics} from "../types/IComics.tsx";
import comicsStore from "../stores/ComicsStore.ts";
import comicsInfoStore from "../stores/ComicsInfoStore.ts";

export default{
    async getComics(limit: number, offset: number): Promise<IComics[]>{
        try{
            comicsStore.setLoading(true);
            const response = await axios.get("/comics", {params: {limit: limit, offset: offset}});
            comicsStore.setLoading(false);
            return response.data;
        }
        catch {}
    },

    async getComicsById(id: number): Promise<IComics[]>{
        try{
            comicsInfoStore.setLoading(true);
            const response = await axios.get("/comics/" + id);
            comicsInfoStore.setLoading(false);
            return response.data;
        }
        catch {}
    },

    async getComicsByTitle(limit: number, title: string): Promise<IComics[]>{
        try{
            const response = await axios.get("/comics", {params: {limit: limit, titleStartsWith: title}});
            return response.data;
        }
        catch {}
    }
}