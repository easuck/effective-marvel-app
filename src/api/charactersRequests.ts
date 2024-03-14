import axios from "./axios.ts";

export default{
    async getCharacters(): Promise<any>{
        const response = await axios.get("/characters", {params: {limit: 10}});
        return response.data.data.results;
    },

    async getCharacterById(id: number): Promise<any>{
        const response = await axios.get("/characters/" + id);
        return response.data.data;
    }
}