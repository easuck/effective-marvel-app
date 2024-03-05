import {FC} from "react";
import styles from "./styles.module.css"
import {comics} from "../../data/comicsData.tsx"
import {Link} from "react-router-dom";
import SearchBar from "../../components/searchBar/searchBar.tsx";

const Comics: FC = () => {
    let comicsAmount = comics.length;
    return(
        <section className={styles.comicsPage}>
            <div className={styles.labelWrapper}>
                <h3 className={styles.labelCharacters}>Comics</h3>
                <h3 className={styles.labelAmount}>({comicsAmount})</h3>
            </div>
            <SearchBar/>
            <hr className={styles.divider}/>
            <div className={styles.comicsList}>
                {comics.map((comics, index) => {
                    return <Link key={index} className="link" to={"/comics/" + comics.id}>
                        <div className={styles.comics}>{comics.name}</div>
                    </Link>
                })}
            </div>
        </section>
    )
}

export default Comics;

