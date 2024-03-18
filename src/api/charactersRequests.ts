import axios from "./axios.ts";

export default{
    async getCharacters(limit: number, offset: number): Promise<any>{
        const response = await axios.get("/characters", {params: {limit: limit, offset: offset}});
        return response.data.data.results;
    },

    async getCharacterById(id: number): Promise<any>{
        const response = await axios.get(`/characters/${id}`);
        return response.data.data.results;
    },

    async getCharacterComicsById(id: number): Promise<any>{
        const response = await axios.get(`/characters/${id}/comics`);
        return response.data.data.results;
    },

    async searchCharacterByName(name: string): Promise<any>{
        const response = await axios.get("/characters", {params: {limit: 18, nameStartsWith: name}});
        return response.data.data.results;
    }
}