import {makeAutoObservable, reaction} from "mobx";

export const themes: string[] = ["light", "dark"];

class ThemeStore{
    activeTheme: string = localStorage.getItem("ACTIVE_THEME");

    constructor() {
        makeAutoObservable(this);
        reaction(
            () => [this.activeTheme],
            () => {
                document.body.dataset.theme = this.activeTheme;
            },
            {fireImmediately: true}
        )
    }

    changeActiveTheme = (theme: string) => {
        if (theme != "dark" && theme != "light"){
            return;
        }
        localStorage.setItem("ACTIVE_THEME", theme);
        this.activeTheme = theme;
    }
}

export const themeStore = new ThemeStore();