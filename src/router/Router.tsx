import {FC} from "react";
import Characters from "../pages/characters/Characters.tsx";
import Comics from "../pages/comics/Comics.tsx";
import {useRoutes} from "react-router-dom";
import Header from "../components/header/Header.tsx";
import CharacterInfo from "../pages/characterInfo/CharacterInfo.tsx";
import ComicsInfo from "../pages/comicsInfo/ComicsInfo.tsx";
import styles from "./router.module.css"

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
    return <div className={styles.content}>{element}</div>;
}
export default Router;