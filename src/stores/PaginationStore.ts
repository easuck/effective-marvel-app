import {makeAutoObservable} from "mobx";

const pagesInBlock: number = 10;

class PaginationStore{
    paginationBlocksAmount: number = 1;
    paginationBlocks: Map<number, number[]> = new Map<number, number[]>();
    currentPaginationBlock: number = 1;
    pages: Map<number, boolean> = new Map<number, boolean>();

    constructor() {
        makeAutoObservable(this);
    }

    setPaginationBlocksAmount = (elementsAmount: number) => {
        this.paginationBlocksAmount = Math.ceil(elementsAmount / pagesInBlock);
        console.log("set pagination blocks amount отработал");
    }

    setPaginationBlocks = () => {
        this.paginationBlocks.clear();
        for (let i = 1; i <= this.paginationBlocksAmount; i++){
            let firstPageInThisBlock: number = (i - 1) * pagesInBlock + 1;
            let lastPageInThisBlock: number = i == this.paginationBlocksAmount ? this.pages.size : i * pagesInBlock;
            let pagesInThisBlock: number[] = [];
            for (let i: number = firstPageInThisBlock; i <= lastPageInThisBlock; i++){
                pagesInThisBlock = [...pagesInThisBlock, i];
            }
            this.paginationBlocks.set(i, pagesInThisBlock);
        }
    }

    setCurrentPaginationBlock = (currentPaginationBlock: number) => {
        //todo
    }

    setPages = (pagesAmount: number) => {
        this.pages.clear();
        for (let i = 1; i <= pagesAmount; i++){
            if (i == 1) {
                this.pages.set(1, true)
            }
            else {
                this.pages.set(i, false);
            }
        }
        console.log("set pages отработал");
    }

    setCurrentPage = (current: number) => {
        for (let [key] of this.pages){
            if (key != current){
                this.pages.set(key, false);
            }
            else{
                this.pages.set(key, true);
            }
        }
    }
}

export const paginationStore = new PaginationStore();
export default paginationStore;