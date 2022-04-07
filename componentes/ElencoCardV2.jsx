import styles from '../styles/elencoCard.module.css'


export default function ElencoCardV2(props){

        return(
            <div className={`${styles.card} ${styles.notFound}`}>
                <div className={styles.nomeContainer}>
                    <p>{props.name}</p>
                </div>
                
            </div>
        )
    

}