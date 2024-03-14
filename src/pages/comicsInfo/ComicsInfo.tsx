import {FC} from "react";
import styles from "./styles.module.css"
import {Link, useParams} from "react-router-dom";

const ComicsInfo: FC = () =>{
    const {id} = useParams<"id">()
    return(
        <section className={styles.comicsInfo}>
            <h1>{/*{comics[id].name}*/}</h1>
            <div className={styles.charactersList}>
                <h3>Characters in this comics:</h3>
                {/*{comics[id].characters.map((characterIndex, index) =>{
                    return <Link key={index} className="link" to={"/characters/" + characterIndex}>
                        <h4>{characters[characterIndex].name}</h4>
                    </Link>
                })}*/}
            </div>
        </section>
    )
}

export default ComicsInfo;