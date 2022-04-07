import styles from '../styles/ImgCapa.module.css'

export default function ImgCapa(props){

    return(
        <div className={styles.imgContainer}>
            <div className={styles.img}>
                <img src={props.imagem} />
            </div>
            <div>{props.titulo}</div>
            <div>{props.resumo}</div>
        </div>

    )
}