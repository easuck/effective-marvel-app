import {FC} from "react";
import Characters from "./components/characters/characters.tsx";
import Comics from "./components/comics/comics.tsx";
import {useRoutes} from "react-router-dom";
import Header from "./components/header/header.tsx";
import CharacterInfo from "./components/characterInfo/characterInfo.tsx";


const Router: FC = () => {
    let element = useRoutes([
        {
            path: "/",
            element: <Header/>,
            children:[
                {index: true, element: <Characters/>},
                {path: "characters", element: <Characters/>},
                {path: "characters/:id", element: <CharacterInfo/>},
                {path: "comics", element: <Comics/>},
                {path: "*", element: <div>page not found</div>} 
            ]
        }
    ])
    return element;
}
export default Router;