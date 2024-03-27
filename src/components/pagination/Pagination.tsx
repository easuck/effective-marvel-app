import {FC, useEffect, useState} from "react";
import styles from "./styles.module.css"

const Pagination: FC<{pagesAmount: number, page: number, setPage: (currentPage: number) => void}> =
    ({pagesAmount, page, setPage}) => {
    const [activeButton, setActiveButton] = useState<boolean[]>([true]);

    const setHighlighted = (index: number) => {
        const array: boolean[] = activeButton.map((button) => {
            button = false;
            return button;
        });
        array[index] = true;
        setActiveButton(array);
    }

    useEffect(() => {
        Array.from({length: pagesAmount - 1}, () => {
            setActiveButton(prev => [...prev, false]);
        })
    }, []);

    useEffect(() => {
        setHighlighted(page - 1);
    }, [page]);

    return(
        <div className={styles.paginator}>
            <button disabled={page == 1} className={styles.button} onClick={() => setPage(page - 1)}>{"<"}</button>
            {Array.from({length: pagesAmount}, (_, i) => {
                return <button className={[styles.pageButton, activeButton[i] ? styles.selected : ""].join(" ")} key={i + 1}
                               onClick={() => setPage(i + 1)}
                >
                    {i + 1}
                </button>
            })}
            <button disabled={page == pagesAmount} className={styles.button} onClick={() => setPage(page + 1)}>{">"}</button>
        </div>
    )}

export default Pagination;
