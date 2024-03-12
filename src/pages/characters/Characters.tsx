import {FC, useEffect} from "react";
import styles from "./styles.module.css"
import CharacterCard from "../../components/characterCard/CharacterCard.tsx";
import {characters} from "../../data/charactersData.tsx";
import SearchBar from "../../components/searchBar/SearchBar.tsx";
import axios from "axios";

const Characters: FC = () => {
    let charactersAmount: number = characters.length;
    /*const characterById = "https://gateway.marvel.com:443/v1/public/characters/1011334?apikey=5d103b1af37466dcc9374d4349a2c10f" +
        `&${import.meta.env.VITE_TIMESTAMP}` + `&${import.meta.env.VITE_HASH}`

    useEffect(() => {
        axios
            .get(characterById).then(res => console.log(res.data.data.results));
    }, []);*/

    return(
        <section className={styles.characters}>
            <SearchBar subject="Characters" amount={charactersAmount}/>
            <hr className={styles.divider}/>
            <div className={styles.charactersGrid}>
                {characters.map((character, index) => {
                    return <CharacterCard key={index} id={character.id} image={character.image} name={character.name}
                                          desc={character.desc}/>
                })}
                {characters.map((character, index) => {
                    return <CharacterCard key={index} id={character.id} image={character.image} name={character.name}
                                          desc={character.desc}/>
                })}
                {characters.map((character,index) => {
                    return  <CharacterCard key={index} id={character.id} image={character.image} name={character.name}
                                          desc={character.desc}/>
                })}
            </div>
        </section>
    )
};

export default Characters;
