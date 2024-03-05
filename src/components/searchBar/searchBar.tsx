import {FC} from "react";
import styles from "./styles.module.css"
const SearchBar: FC<{subject: string}> = ({subject}) =>{
    return (
        <form className={styles.form}>
            <input placeholder={"Search for " + subject + " by Name"}/>
            <button>SEARCH</button>
        </form>
    )
}

export default SearchBar;