import {FC, useEffect} from "react";
import styles from "./styles.module.css"

const Pagination: FC<{pagesAmount: number, page: number, setPage: (currentPage: number) => void}> =
    ({pagesAmount, page, setPage}) => {

    return(
        <div className={styles.paginator}>
            <button disabled={page == 1} className={styles.button} onClick={() => setPage(page - 1)}>{"<"}</button>
            {Array.from({length: pagesAmount}, (_, i) => {
                return <button className={styles.pageButton} key={i + 1} id={"pageButton" + (i + 1)}
                               onClick={(event) => {
                                   setPage(i + 1);
                               }}
                >
                    {i + 1}
                </button>
            })}
            <button disabled={page == pagesAmount} className={styles.button} onClick={() => setPage(page + 1)}>{">"}</button>
        </div>
    )}

export default Pagination;
