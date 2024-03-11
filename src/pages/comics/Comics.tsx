import {FC} from "react";
import styles from "./styles.module.css"
import {comics} from "../../data/comicsData.tsx"
import {Link} from "react-router-dom";
import SearchBar from "../../components/searchBar/SearchBar.tsx";

const Comics: FC = () => {
    let comicsAmount = comics.length;
    return(
        <section className={styles.comicsPage}>
            <SearchBar subject="Comics" amount={comicsAmount}/>
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

