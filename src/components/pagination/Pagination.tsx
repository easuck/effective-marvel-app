import {FC} from "react";
import styles from "./styles.module.css"

const Pagination: FC<{pages: number, setPage: (currentPage: number) => void}> =
    ({pages, getCharacters, setPage}) => {
    return(
        <div className={styles.paginator}>
            {Array.from({length: pages}, (_, i) => {
                return <button className={styles.pageButton} key={i + 1}
                               onClick={(event) => {setPage(i + 1);}}
                >
                    {i + 1}
                </button>
            })}
        </div>
    )
}

export default Pagination;
