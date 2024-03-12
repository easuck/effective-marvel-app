import axios from "axios";
import envs from "../config/environments.ts"

const instance = axios.create({
    baseURL: envs.baseURL
});

export default instance;