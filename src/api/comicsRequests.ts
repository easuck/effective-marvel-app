import axios from "./axios.ts";

export default{
    async getComics(): Promise<any>{
        const response = await axios.get("/comics", {params: {limit: 10}});
        return response.data.data.results;
    },

    async getComicsById(id: number): Promise<any>{
        const response = await axios.get("/comics/" + id);
        return response.data.data.results;
    }
}