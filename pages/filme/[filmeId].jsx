import styles from "../../styles/filme.module.css"
import NavBar from '../../componentes/NavBar';
import { FaBars, FaVideoSlash } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { key, urlBase, urlImg } from '../../config/apiConfig'
import { useRouter } from "next/router";
import SwiperCore, { Navigation, Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/bundle';
import 'swiper/css/navigation';
import YouTube from "react-youtube";
import ElencoCard from "../../componentes/ElencoCard";
import ElencoCardV2 from "../../componentes/ElencoCardV2";



export default function FilmeDetalhes(){

    SwiperCore.use([Navigation, Pagination]);

  
    const router = useRouter()
    const[menuVari, setMenuVari] = useState(true);
    const[Detalhes, setDetalhes] = useState([])
    const[Trailers, setTrailers] = useState([])
    const[swiper, setSwiper] = useState(null)
    const[renderVideo, setRenderVideo] = useState(false)
    const[generos, setGeneros] = useState([])
    const[elenco, setElenco] = useState([])
    
  
    function menuativo(){
      setMenuVari(!menuVari)
      
    }

   
    
    useEffect(() => { 
        const Id = router.query.filmeId     
        if(!router.isReady) return;

        fetch(`${urlBase}movie/${Id}?api_key=${key}&language=pt-BR`)
        .then(response => response.json())
        .then(response => {
            
            setDetalhes(response)

            fetch(`${urlBase}movie/${Id}/videos?api_key=${key}`)
            .then(response => response.json())
            .then(videoData => {
                const tr = videoData.results.find(vid => vid.name = 'Trailer')
                setTrailers(tr)

                fetch(`${urlBase}movie/${Id}/credits?api_key=${key}`)
                .then(response => response.json())
                .then(response => {
            
                    setElenco(response)
                })

            })
        })
        
    },[router.isReady])

  
    console.log(Trailers)
  


   function renderTrailer(){
       setRenderVideo(!renderVideo)
   }

  
  
  
 
    
 

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div  className={styles.logoContainer}><h1 className={styles.logo}>Dmdb</h1></div>
                <button  className={styles.hambMenu} onClick={() => menuativo()}> <FaBars /></button>
                <div className={`${styles.menu} ${menuVari ? styles.display : null}`}>
                    <NavBar />
                </div>
            </div>
            <div className={styles.card} style={{backgroundImage:`url(${urlImg}w1280${Detalhes.backdrop_path})`, backgroundPosition:'center'}}>
                <div className={styles.conteudoContainer}>
                    <div className={styles.nome}>
                        {Detalhes.title}
                    </div>  
                    <div className={styles.generosContainer}>
                        {Detalhes.genres && Detalhes.genres.slice(0, 5).map((generos, i) =>(
                            <span key ={i} className={styles.genero}>{generos.name}</span>
                            ))
                        }
                    </div>
                    <div className={styles.btnContainer}>
                        <button onClick={() => renderTrailer()} className={styles.btnTrailer}>Ver Trailer</button>
                        <div className={styles.resumo}>
                            <p>Sinopse: {Detalhes.overview}</p>
                        </div>
                        
                    </div>
                    {renderVideo && Trailers != undefined  ?  (
                        <div className={styles.video} >
                            <div className={styles.trailers}>
                                <button onClick={() => {setRenderVideo(!renderVideo)}} className={styles.closebtn}> x </button>
                                <YouTube videoId={Trailers.key} className={styles.trailer} />
                            </div>
                        </div>
                        ):(
                            <div className={renderVideo ? styles.video : styles.dispNone}> 
                                <button onClick={() => {setRenderVideo(!renderVideo)}} className={styles.vidErrorclosebtn}> x </button>
                                <p className={styles.vidError}><FaVideoSlash/> Video nao encontrado</p>
                            </div>
                        )
                    }     

                 
                    <div className={styles.elencoContainer}>
                        <p style={{textTransform: 'uppercase', fontSize: '30px'}}>Elenco</p>
                        <div className={styles.atores}>
                            {   
                                 elenco.cast && elenco.cast.map(ator => {
                                    if(ator.profile_path == null){
                                        return <ElencoCardV2 

                                            name={ator.name}
                                        />
                                    } else{
                                        return (
                                            <ElencoCard
                                                img={`${urlImg}w500${ator.profile_path}`}
                                                name={ator.name}
                                                papel={ator.character}
                                            />
                                        )
                                    }

                                    }

                                 )
                            }
                        </div>
                    </div>
                </div>
            </div>
            
            

        </div>
    )
}