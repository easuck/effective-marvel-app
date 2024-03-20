import axios from "./axios.ts";

export default{
    async getCharacters(limit: number, offset: number): Promise<any>{
        try {
            const response = await axios.get("/characters", {params: {limit: limit, offset: offset}})
            return response.data.data.results;
        }
        catch {}
    },

    async getCharacterById(id: number): Promise<any>{
        try{
            const response = await axios.get(`/characters/${id}`);
            return response.data.data.results;
        }
        catch {}
    },

    async getCharacterComicsById(id: number): Promise<any>{
        try{
            const response = await axios.get(`/characters/${id}/comics`);
            return response.data.data.results;
        }
        catch {}
    },

    async searchCharacterByName(limit: number, name: string): Promise<any>{
        try{
            const response = await axios.get("/characters", {params: {limit: limit, nameStartsWith: name}});
            return response.data.data.results;
        }
        catch {}
    }
}