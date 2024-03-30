import {FC, useEffect} from "react";
import styles from "./styles.module.css";
import {paginationStore as store} from "../../stores/PaginationStore.ts";
import {observer} from "mobx-react-lite";

const Pagination: FC<{pagesAmount: number, page: number, setPage: (currentPage: number) => void}> =
    observer(({pagesAmount, page, setPage}) => {

    useEffect(() => {
        store.setPages(pagesAmount);
        store.setPaginationBlocksAmount(pagesAmount);
        store.setPaginationBlocks();
    }, [pagesAmount]);

    useEffect(() => {
        store.setCurrentPage(page);
    }, [page]);

    return(
        <div className={styles.paginator}>
            <button disabled={store.currentPaginationBlock == 1} className={styles.blockButton}
                    onClick={() => store.previousPaginationBlock()}>{"<<"}</button>
            <button disabled={page == 1} className={styles.button}
                    onClick={() => setPage(page - 1)}>{"<"}</button>
            {
                store.paginationBlocks.get(store.currentPaginationBlock)?.map((page) => {
                    return <button
                        key={page}
                        className={[styles.pageButton, store.pages.get(page) ? styles.selected : ""].join(" ")}
                        onClick={() => setPage(page)}
                    >
                        {page}
                    </button>
                })
            }
            <button disabled={page == pagesAmount} className={styles.button}
                    onClick={() => setPage(page + 1)}>{">"}</button>
            <button disabled={store.currentPaginationBlock == store.paginationBlocksAmount} className={styles.blockButton}
                    onClick={() => store.nextPaginationBlock()}>{">>"}</button>
        </div>
    )
    });

export default Pagination;
