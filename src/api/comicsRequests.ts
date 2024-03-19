import axios from "./axios.ts";

export default{
    async getComics(limit: number, offset: number): Promise<any>{
        try{
            const response = await axios.get("/comics", {params: {limit: limit, offset: offset}});
            return response.data.data.results;
        }
        catch {}
    },

    async getComicsById(id: number): Promise<any>{
        try{
            const response = await axios.get("/comics/" + id);
            return response.data.data.results;
        }
        catch {}
    },

    async getComicsCharactersById(id: number): Promise<any>{
        try{
            const response = await axios.get(`/comics/${id}/characters`);
            return response.data.data.results;
        }
        catch {}
    },

    async searchComicsByTitle(title: string): Promise<any>{
        try{
            const response = await axios.get("/comics", {params: {limit: 10, titleStartsWith: title}});
            return response.data.data.results;
        }
        catch {}
    }
}