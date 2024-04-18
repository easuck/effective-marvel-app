import {FC} from "react";
import {ColorRing} from "react-loader-spinner";
import styles from "./loader.module.css"

export const Loader: FC = () => {
    return(
        <div className={styles.loaderContainer}>
                    <ColorRing colors={["red", "red", "red", "red", "red"]}/>
        </div>
    )
}

export default Loader;