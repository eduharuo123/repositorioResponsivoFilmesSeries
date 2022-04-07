import styles from '../styles/card.module.css'
import Link from 'next/link'

export const Card = (props) => {

    const score = (voto) => {
        if(voto >= 8){
            return styles.green
        } else if (voto >= 6) {
            return styles.orange
        } else {
            return styles.red
        }
    }
 
    
    return (
        <Link href={`/filme/${props.id}`}>
            <div className={styles.card}>
                    <img style={{ height:'300px',width:'200px' }} src={props.img}/>





                <div className={styles.titulos}>
                    <h3>{props.titulo}</h3>
                </div>

                <div className={`votos ${styles.votos}`}>
                    <h3 className={score(props.votos)}>{props.votos}</h3>
                </div>

        

            </div>
        </Link>
    );
};