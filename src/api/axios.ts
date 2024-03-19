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

instance.interceptors.request.use(
    undefined,
    error => {
            console.log("ошибка");
            return Promise.reject(error.response);
    }
);

export default instance;