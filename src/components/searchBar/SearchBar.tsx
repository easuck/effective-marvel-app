import React, {FC} from "react";
import styles from "./styles.module.css";
import {useTranslation} from "react-i18next";

const SearchBar: FC<{subject: string, amount: number,
    inputHandler: (event: React.ChangeEvent<HTMLInputElement>) => void,
    callback: (event: React.MouseEvent<HTMLButtonElement>) => void,
    searchWord: string, canselDebounce: () => void}> =
    ({subject, amount, inputHandler, callback, searchWord, canselDebounce}) => {
    const {t} = useTranslation();

    return (
        <section>
            <div className={styles.labelWrapper}>
                <h3 className={styles.labelCharacters}>{t(subject)}</h3>
                <h3 className={styles.labelAmount}>({amount})</h3>
            </div>
            <form className={styles.form}>
                <input value={searchWord} placeholder={t("Search for " + subject + " by Name")} onChange={(event) => inputHandler(event)}/>
                <button onClick={(event) => {callback(event); canselDebounce()}}>{t("SEARCH")}</button>
            </form>
        </section>
    )
}

export default SearchBar;