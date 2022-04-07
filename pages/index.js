import { useState } from 'react';
import styles from '../styles/Home.module.css';
import NavBar from '../componentes/NavBar';
import { FaBars, FaHamburger } from 'react-icons/fa';
import App from '../componentes/App';

export default function Home() {

  const[menuVari, setMenuVari] = useState(true);
  const[pesquisa, setPesquisa] = useState('')





  return (
    <App />
  )
}
