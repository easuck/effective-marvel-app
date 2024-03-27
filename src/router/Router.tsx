import {FC} from "react";
import Characters from "../pages/characters/Characters.tsx";
import {useRoutes} from "react-router-dom";
import CharacterInfo from "../pages/characterInfo/CharacterInfo.tsx";
import Layout from "../components/layout/Layout.tsx";
import Comics from "../pages/comics/Comics.tsx";

const Router: FC = () => {
    return useRoutes([
        {
            path: "/",
            element: <Layout/>,
            children: [
                {
                    index: true,
                    element: <Characters/>
                },
                {
                    path: "characters",
                    element: <Characters/>
                },
                {
                    path: "characters/:id",
                    element: <CharacterInfo/>
                },
                {
                    path: "comics",
                    element: <Comics/>},
                /*{
                    path: "comics/:id",
                    element: <ComicsInfo comics={comicsInfoStore.comics}
                    setComics={comicsInfoStore.setComics}
                    characters={charactersStore.characters}
                    setCharacters={charactersStore.setCharacters}/>},
                {
                    path: "*",
                    element: <div>page not found</div>
                }*/
            ]
        }
    ]);
};
export default Router;