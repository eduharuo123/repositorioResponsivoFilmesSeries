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
import { Card } from "../../componentes/card.jsx";


export default function ResultadoBusca(){

    SwiperCore.use([Navigation, Pagination]);

    const router = useRouter()
    const[menuVari, setMenuVari] = useState(true);
  
    const[Filmes, setFilmes] = useState([])
    const[index, setIndex] = useState(1)
    const [swiper, setSwiper] = useState(null)
    

    useEffect(() =>{
        const resultado = router.query.buscarFilme
        if(!router.isReady) return;
        fetch(`${urlBase}search/movie?&api_key=${key}&query=${resultado}&language=pt-BR&page=${index}`)
        .then((res) => res.json())
        .then((data) => {
            setFilmes(data.results)
            
        })
       
    }, [router.isReady,index])


    function mostrarMais(){
        if(Filmes.length > 0){
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
                        
                                    {Filmes.map((filme, i) => (

                                         <SwiperSlide key = {i} >
                                                <Card
                                                    img={`${urlImg}w500${filme.poster_path}`}
                                                    id = {filme.id}
                                                    titulo= {filme.title}
                                                    votos={filme.vote_average}
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
                                {Filmes.map((filme, i) => (
                    
                                        <div className={styles.cardFull} key={i}>

                                            <Card
                                                id = {filme.id}
                                                img={`${urlImg}w500${filme.poster_path}`}
                                                titulo= {filme.title}
                                                votos={filme.vote_average}
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