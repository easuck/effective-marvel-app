const useLocalStorage = () => {
    const setItem = (key: string, value: unknown) => {
        localStorage.setItem(key, JSON.stringify(value));
    }

    const getItem = (key: string) => {
        const value = localStorage.getItem(key);
        return value ? JSON.parse(value) : undefined;
    }

    const removeItem = (key: string) => {
        localStorage.removeItem(key);
    }

    return {setItem, getItem, removeItem};
}

export default useLocalStorage;