import styles from '../styles/elencoCard.module.css'
import notFoundBackground from "../img/not-found.png"

export default function ElencoCard(props){

        return(
            <div className={styles.card} style={{backgroundImage: `url( ${props.img} )`}}>
                <div className={styles.nomeContainer}>
                    <p>{props.name}</p>
                    <p>Papel: {props.papel}</p>
                </div>
            </div>
        )
    

}