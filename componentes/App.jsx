import { useEffect, useState } from "react";
import { key, urlBase, urlImg } from "../config/apiConfig";
import NavBar from '../componentes/NavBar';
import { FaBars, FaHamburger } from 'react-icons/fa';
import SwiperCore, { Navigation, Pagination} from 'swiper';
import 'swiper/css';
import 'swiper/css/bundle';
import 'swiper/css/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import styles from "../styles/App.module.css"
import { Card } from "./card.jsx";



export default function App(){

        SwiperCore.use([Navigation, Pagination]);

        const[menuVari, setMenuVari] = useState(true);
        const[pesquisa, setPesquisa] = useState('')
        const[Filmes, setFilmes] = useState([])
        const[index, setIndex] = useState(1)
        const[swiper, setSwiper] = useState(null)
        

        useEffect(() =>{
            fetch(`${urlBase}movie/popular?api_key=${key}&language=pt-BR&page=${index}`)
            .then(response=> response.json())
            .then(response =>{
                setFilmes(response.results)
                
            })
           
        }, [index])

  


        function mostrarMais(){
            const newIndex = index + 1
            setIndex(newIndex)
            swiper.slideTo(0)
            
        }

        function voltar(){
            if(index > 1){
                const newIndex = index - 1
                setIndex(newIndex)    
                swiper.slideTo(0)            
            }

        }

        function mostrarMaisFull(){
            const newIndex = index + 1
            setIndex(newIndex)
            swiper.slideTo(0)
            window.scrollTo(0, 0)
            
        }

        function voltarFull(){
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
    
      
        console.log(pesquisa)
       

        const handleOnChange = (e) => {
          setPesquisa(e.target.value)
        }

       
        return(

            <div className={styles.container}>
                <div className={styles.header}>
                    <div  className={styles.logoContainer}><h1 className={styles.logo}>Dmdb</h1></div>
                    <div className={styles.searchContainer}>
                        <form action={`/BuscarFilmes/${pesquisa}`}>
                            <input 
                                className={styles.pesquisar} 
                                type="text" 
                                placeholder="Pesquisar Filmes"
                                value={pesquisa}
                                onChange={handleOnChange} 
                            />
                            <button action={`/BuscarFilmes/${pesquisa}`} className={styles.buscarBtn}>Buscar</button>
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
                        
                                    {Filmes.map(filme => (
                                        <SwiperSlide>
                                            <Card
                                                id = {filme.id}
                                                img={`${urlImg}w500${filme.poster_path}`}
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
                            <div className={styles.cardContainerFull} style={{marginBottom:'0'}}>
                                {Filmes.map(filme => (
                                    <div className={styles.cardFull}>

                                            <Card
                                                id = {filme.id}
                                                img={`${urlImg}w500${filme.poster_path}`}
                                                titulo= {filme.title}
                                                votos={filme.vote_average}
                                            />

                                    </div>
                                ))}

                            </div>
                            <h3 style={{fontSize:'25px', color:'white'}}>{index}</h3>
                            <div className={styles.gridBtnContainer}>
                                <button onClick={() => voltarFull()}>Voltar</button>
                                <button onClick={() => mostrarMaisFull()}>Carregar Mais</button>
                            </div >
                        
                        </div>
                
                    </div>
                 </div>
      
            </div>           
        ) 
}