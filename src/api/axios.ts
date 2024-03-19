import axios from "axios";
import envs from "../config/environments.ts"

const instance = axios.create({
    baseURL: envs.baseURL,
    params: {
        ts: envs.timestamp,
        apikey: envs.apiKey,
        hash: envs.hash
    }
});

instance.interceptors.response.use(
    undefined,
    error => {
            console.log(error.response);
            return Promise.reject(error);
    }
);

export default instance;