import {FC} from "react";
import Characters from "../pages/characters/Characters.tsx";
import Comics from "../pages/comics/Comics.tsx";
import {useRoutes} from "react-router-dom";
import CharacterInfo from "../pages/characterInfo/CharacterInfo.tsx";
import ComicsInfo from "../pages/comicsInfo/ComicsInfo.tsx";
import Layout from "../components/layout/Layout.tsx";
import CharactersStore from "../stores/CharactersStore.ts";
import {observer} from "mobx-react-lite";
import ComicsStore from "../stores/ComicsStore.ts";

const charactersStore = new CharactersStore();
const characterInfoStore = new CharactersStore();
const comicsStore = new ComicsStore();
const comicsInfoStore = new ComicsStore();

const Router: FC = observer(() => {
    const element = useRoutes([
        {
            path: "/",
            element: <Layout/>,
            children:[
                {
                    index: true,
                    element: <Characters {...charactersStore}/>},
                {
                    path: "characters",
                    element: <Characters {...charactersStore}/>},
                {
                    path: "characters/:id",
                    element: <CharacterInfo characters={characterInfoStore.characters}
                    setCharacters={characterInfoStore.setCharacters}
                    comics={comicsStore.comics}
                    setComics={comicsStore.setComics}/>},
                {
                    path: "comics",
                    element: <Comics {...comicsStore}/>},
                {
                    path: "comics/:id",
                    element: <ComicsInfo comics={comicsInfoStore.comics}
                    setComics={comicsInfoStore.setComics}
                    characters={charactersStore.characters}
                    setCharacters={charactersStore.setCharacters}/>},
                {
                    path: "*",
                    element: <div>page not found</div>}
            ]
        }
    ])
    return element;
});
export default Router;