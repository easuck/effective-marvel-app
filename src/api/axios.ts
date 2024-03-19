import axios from "axios";
import envs from "../config/environments.ts";
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


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
            toast("Произошла ошибка со статус кодом " + error.response.status);
            return Promise.reject(error);
    }
);

export default instance;