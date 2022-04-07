import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { key, urlBase, urlImg } from "../../config/apiConfig";
import NavBar from '../../componentes/NavBar';
import { FaBars, FaHamburger } from 'react-icons/fa';
import SwiperCore, { Navigation, Pagination} from 'swiper';
import 'swiper/css';
import 'swiper/css/bundle';
import 'swiper/css/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import styles from '../../styles/buscarFilmes.module.css'
import { SerieCard } from "../../componentes/SerieCard.jsx";

export default function ResultadoBuscaSerie(){

    SwiperCore.use([Navigation, Pagination]);

    const router = useRouter()
    const[menuVari, setMenuVari] = useState(true);
    const[Series, setSeries] = useState([])
    const[index, setIndex] = useState(1)
    const[swiper, setSwiper] = useState(null)
    

    useEffect(() =>{
        const resultado = router.query.buscarSerie
        if(!router.isReady) return;
        fetch(`${urlBase}search/tv?&api_key=${key}&query=${resultado}&language=pt-BR&page=${index}`)
            .then((res) => res.json())
            .then((data) => {
                setSeries(data.results)
            
        })
       
    }, [router.isReady,index])

   
    console.log(Series)

    function mostrarMais(){
        if(Series.length > 0){
            const newIndex = index + 1
            setIndex(newIndex)
            swiper.slideTo(0)
            window.scrollTo(0, 0)
     
        } 
    }

    function voltar(){
        if(index > 1){
            const newIndex = index - 1
            setIndex(newIndex)    
            swiper.slideTo(0) 
            window.scrollTo(0, 0)           
        }

    }

    function menuativo(){
        setMenuVari(!menuVari)
      }


    return(
        <div className={styles.container}>
            <div className={styles.header}>
                <div  className={styles.logoContainer}><h1 className={styles.logo}>Dmdb</h1></div>
                <button  className={styles.hambMenu} onClick={() => menuativo()}> <FaBars /></button>
                <div className={`${styles.menu} ${menuVari ? styles.display : null}`}>
                    <NavBar />
                </div>
            </div>
            <div className={styles.filmes}>
                    <div style={{display: "flex", justifyContent:"center", alignItems:"center", flexDirection:"column"}}>
                        <div className={styles.titulo}>Resultados</div>
                        <div className={styles.cardContainer}>
                            <div className={styles.poster}>
                                <Swiper
                                    onSwiper = {setSwiper} 
                                    grabCursor={true}
                                    spaceBetween={0}
                                    slidesPerView={1}
                                    direction={'horizontal'}
                                    navigation
                                >
                        
                                    {Series.map((serie, i) => (
                                        <SwiperSlide key = {i} >
                                            <SerieCard 
                                                id = {serie.id}
                                                img={`${urlImg}w500${serie.poster_path}`}
                                                titulo= {serie.name}
                                                votos={serie.vote_average}
                                            />

                                        </SwiperSlide>
                                    ))}

                                </Swiper>
                            </div>
                    
                            <div className={styles.btnContainer}>
                                <div className={styles.btn}>
                                    <button onClick={() => voltar()}>Voltar</button>
                                    <h3>{index}</h3>
                                    <button onClick={() => mostrarMais()}>Mostrar mais</button>
                                </div>
                                        
                            </div>

                   
                        </div>
                        <div className={styles.gridContainer}>
                            <div className={styles.cardContainerFull}>
                                {Series.map((serie, i) => (
                                    <div className={styles.cardFull} key={i}>

                                            <SerieCard
                                                id = {serie.id}
                                                img={`${urlImg}w500${serie.poster_path}`}
                                                titulo= {serie.name}
                                                votos={serie.vote_average}
                                            />

                                    </div>
                                ))}

                            </div>
                            <div className={styles.btnContainer}>
                                <h3 style={{fontSize:'25px',color:'white'}}>{index}</h3>
                                <div className={styles.btn}>
                                    <button onClick={() => voltar()}>Voltar</button>
                                    <button onClick={() => mostrarMais()}>Mostrar mais</button>
                                </div>
                                        
                            </div>
                        </div>
                
                    </div>
                 </div>            
        </div>   
    )
}