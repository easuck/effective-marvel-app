import {FC} from "react";
import styles from "./styles.module.css"
const SearchBar: FC = () =>{
    return (
        <form className={styles.form}>
            <input placeholder="Search for Character by Name"/>
            <button>SEARCH</button>
        </form>
    )
}

export default SearchBar;