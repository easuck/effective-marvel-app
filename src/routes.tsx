import {FC} from "react";
import Characters from "./pages/characters/characters.tsx";
import Comics from "./pages/comics/comics.tsx";
import {useRoutes} from "react-router-dom";
import Header from "./components/header/header.tsx";
import CharacterInfo from "./pages/characterInfo/characterInfo.tsx";
import ComicsInfo from "./pages/comicsInfo/comicsInfo.tsx";


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
                {path: "comics/:id", element: <ComicsInfo/>},
                {path: "*", element: <div>page not found</div>} 
            ]
        }
    ])
    return element;
}
export default Router;