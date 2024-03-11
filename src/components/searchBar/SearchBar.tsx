import {FC} from "react";
import styles from "./styles.module.css"
const SearchBar: FC<{subject: string, amount: number}> = ({subject, amount}) =>{
    return (
        <section>
            <div className={styles.labelWrapper}>
                <h3 className={styles.labelCharacters}>{subject}</h3>
                <h3 className={styles.labelAmount}>({amount})</h3>
            </div>
            <form className={styles.form}>
                <input placeholder={"Search for " + subject + " by Name"}/>
                <button>SEARCH</button>
            </form>
        </section>
    )
}

export default SearchBar;