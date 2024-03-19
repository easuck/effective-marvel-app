import {FC} from "react";
import styles from "./styles.module.css"
const SearchBar: FC<{subject: string, amount: number, inputHandler: (event: any) => void, callback: (event: any) => void, searchWord: string}> =
    ({subject, amount, inputHandler, callback, searchWord}) => {
    return (
        <section>
            <div className={styles.labelWrapper}>
                <h3 className={styles.labelCharacters}>{subject}</h3>
                <h3 className={styles.labelAmount}>({amount})</h3>
            </div>
            <form className={styles.form}>
                <input value={searchWord} placeholder={"Search for " + subject + " by Name"} onChange={inputHandler}/>
                <button onClick={callback}>SEARCH</button>
            </form>
        </section>
    )
}

export default SearchBar;