import {FC} from "react";
import styles from "./styles.module.css"
import {comics} from "../../data/comicsData.tsx"
import {Link} from "react-router-dom";

const Comics: FC = () => {
    return(
        <section className={styles.comicsList}>
            {comics.map(comics =>{
                return <Link className="link" to={"/comics/" + comics.id}>
                    <div className={styles.comics}>{comics.name}</div>
                </Link>
            })}
        </section>
    )
}

export default Comics;

