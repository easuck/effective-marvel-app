const envs = import.meta.env;

export default{
    apiKey: envs.VITE_API_KEY,
    timestamp: envs.VITE_TIMESTAMP,
    hash: envs.VITE_HASH,
    baseURL: envs.VITE_BASE_URL
}