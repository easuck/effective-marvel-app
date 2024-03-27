import axios from "./axios.ts";
import {IComics} from "../types/IComics.tsx";

export default{
    async getComics(limit: number, offset: number): Promise<IComics[]>{
        try{
            const response = await axios.get("/comics", {params: {limit: limit, offset: offset}});
            return response.data;
        }
        catch {}
    },

    async getComicsById(id: number): Promise<IComics[]>{
        try{
            const response = await axios.get("/comics/" + id);
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