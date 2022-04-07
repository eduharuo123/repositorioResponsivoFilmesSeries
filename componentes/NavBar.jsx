import Link from "next/link"
import { useState } from "react"
import styles from "../styles/NavBar.module.css"

export default function NavBar(){
    const [mostrar, setMostrar] = useState(false)
    const [mostrarSerie, setMostrarSerie] = useState(false)
    
    const displaySub = () => {
        setMostrar(!mostrar)
    }
    const displaySub2 = () => {
        setMostrarSerie(!mostrarSerie)
    }
    return(

            <ul className={styles.menuNav}>
                <li className={`${styles.filmes} ${mostrar? styles.filmesDisplay : null}`}><p onClick={() => displaySub()}>Filmes</p>
                    <ul className={styles.sub}>
                    <Link href={'/'} ><li className={styles.link}>Em alta</li></Link>
                    </ul>
                </li>
                <li className={`${styles.serie} ${mostrarSerie? styles.serieDisplay : null}`}><p onClick={() => displaySub2()}>Séries</p>
                    <ul className={styles.sub}>
                        <Link href={'/seriesEmAlta'} ><li className={styles.link}>Em alta</li></Link>
                    </ul>
                </li>
            </ul>

        
    )
}