const useLocalStorage = (setFavouritesAmount: (amount: number) => void, favouritesAmount: number) => {
    const setItem = (key: string, value: unknown) => {
        localStorage.setItem(key, JSON.stringify(value));
        setFavouritesAmount(favouritesAmount + 1);
    }

    const getItem = (key: string) => {
        const value = localStorage.getItem(key);
        return value ? JSON.parse(value) : undefined;
    }

    const removeItem = (key: string) => {
        localStorage.removeItem(key);
        setFavouritesAmount(favouritesAmount - 1);
    }

    return {setItem, getItem, removeItem};
}

export default useLocalStorage;