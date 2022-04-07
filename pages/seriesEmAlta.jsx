import { useEffect, useState } from "react";
import { key, urlBase, urlImg } from "../config/apiConfig";
import NavBar from '../componentes/NavBar';
import { FaBars, FaHamburger } from 'react-icons/fa';
import SwiperCore, { Navigation, Pagination} from 'swiper';
import 'swiper/css';
import 'swiper/css/bundle';
import 'swiper/css/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import styles from '../styles/App.module.css'
import { SerieCard } from "../componentes/SerieCard";


export default function SeriesEmAlta(){

        SwiperCore.use([Navigation, Pagination]);

        const[menuVari, setMenuVari] = useState(true);
        const[pesquisa, setPesquisa] = useState('')
        const[Series, setSeries] = useState([])
        const[index, setIndex] = useState(1)
        const[swiper, setSwiper] = useState(null)
        

        useEffect(() =>{
            fetch(`${urlBase}tv/popular?api_key=${key}&language=pt-BR&page=${index}`)
            .then(response=> response.json())
            .then(response =>{
                console.log(response)
                setSeries(response.results)
                
            })
           
        }, [index])

        console.log(Series)


    

  


        function mostrarMais(){
            const newIndex = index + 1
            setIndex(newIndex)
            swiper.slideTo(0)
            window.scrollTo(0, 0)
            
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
    
  


        const handleOnChange = (e) => {
          setPesquisa(e.target.value)
        }
        console.log(pesquisa)

       
        return(

            <div className={styles.container}>
                <div className={styles.header}>
                    <div  className={styles.logoContainer}><h1 className={styles.logo}>Dmdb</h1></div>
                    <div className={styles.searchContainer}>
                        <form action={`/BuscarSeries/${pesquisa}`}>
                            <input 
                                className={styles.pesquisar} 
                                type="text" 
                                placeholder="Pesquisar Séries"
                                value={pesquisa}
                                onChange={handleOnChange} 
                            />
                            <button action={`/BuscarSeries/${pesquisa}`} className={styles.buscarBtn}>Buscar</button>
                        </form>
            
     
                    </div>
                    <button  className={styles.hambMenu} onClick={() => menuativo()}> <FaBars /></button>
                    <div className={`${styles.menu} ${menuVari ? styles.display : null}`}>
                        <NavBar />
                    </div>
                </div>
                <div className={styles.filmes}>
                    <div style={{display: "flex", justifyContent:"center", alignItems:"center", flexDirection:"column"}}>
                        <div className={styles.titulo}>em alta</div>
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
                        
                                    {Series.map((serie,i) => (
                                        <SwiperSlide key = {i}>
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
                            <div className={styles.cardContainerFull} style={{marginBottom:'0'}}>
                                {Series.map((serie,i) => (
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
                            <h3 style={{fontSize:'25px', color:'white'}}>{index}</h3>
                            <div className={styles.gridBtnContainer}>
                                <button onClick={() => voltar()}>Voltar</button>
                                <button onClick={() => mostrarMais()}>Carregar Mais</button>
                            </div >
                        
                        </div>
                
                    </div>
                 </div>
      
            </div>           
        ) 
}