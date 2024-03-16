import axios from "./axios.ts";

export default{
    async getComics(): Promise<any>{
        const response = await axios.get("/comics", {params: {limit: 10}});
        return response.data.data.results;
    },

    async getComicsById(id: number): Promise<any>{
        const response = await axios.get("/comics/" + id);
        return response.data.data.results;
    },

    async getComicsCharactersById(id: number): Promise<any>{
        const response = await axios.get(`/comics/${id}/characters`);
        return response.data.data.results;
    },

    async searchComicsByTitle(title: string): Promise<any>{
        const response = await axios.get("/comics", {params: {limit: 10, titleStartsWith: title}});
        return response.data.data.results;
    }
}